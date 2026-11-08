-- Ranking «Lo más escuchado» de Música sin fronteras.
-- Pegar todo en Supabase → SQL Editor → New query → Run. Se puede correr más de una vez.
--
-- Qué guarda: solo qué pista sonó y cuándo. Nada de las personas (ni IP, ni nombre, ni cookies).
-- Seguridad: la tabla está cerrada. Desde el sitio solo se puede
--   1) sumar una escucha (registrar_escucha) y
--   2) leer el ranking ya contado (mas_escuchadas).
-- Nadie puede leer la tabla cruda, ni cambiar ni borrar escuchas.

create table if not exists public.escuchas (
  id bigint generated always as identity primary key,
  pista text not null check (char_length(pista) between 3 and 200),
  momento timestamptz not null default now()
);
create index if not exists escuchas_momento_idx on public.escuchas (momento);
create index if not exists escuchas_pista_momento_idx on public.escuchas (pista, momento);

alter table public.escuchas enable row level security;
-- Sin políticas: con RLS activado y sin políticas, nadie lee ni escribe la tabla directamente.
revoke all on public.escuchas from anon, authenticated;

-- Sumar una escucha. La pista es la ruta del mp3, por ejemplo «misteriofader/audio/03-amor.mp3».
create or replace function public.registrar_escucha(p_pista text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_pista is null or p_pista !~ '^[A-Za-z0-9._/-]{3,200}$' then
    return;
  end if;
  -- Freno contra abusos: como mucho 30 escuchas de la misma pista por minuto en todo el sitio.
  if (select count(*) from escuchas e
      where e.pista = p_pista and e.momento > now() - interval '1 minute') >= 30 then
    return;
  end if;
  insert into escuchas (pista) values (p_pista);
end;
$$;

-- El ranking: las pistas más escuchadas en los últimos p_dias días (null = desde siempre).
create or replace function public.mas_escuchadas(p_dias int default 7, p_limite int default 10)
returns table (pista text, escuchas bigint)
language sql
stable
security definer
set search_path = public
as $$
  select e.pista, count(*) as escuchas
  from escuchas e
  where p_dias is null or e.momento > now() - make_interval(days => p_dias)
  group by e.pista
  order by count(*) desc, max(e.momento) desc
  limit least(greatest(coalesce(p_limite, 10), 1), 50);
$$;

revoke all on function public.registrar_escucha(text) from public;
revoke all on function public.mas_escuchadas(int, int) from public;
grant execute on function public.registrar_escucha(text) to anon, authenticated;
grant execute on function public.mas_escuchadas(int, int) to anon, authenticated;
