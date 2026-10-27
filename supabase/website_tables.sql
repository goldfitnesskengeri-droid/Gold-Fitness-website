-- Dhanus Gold Fitness website forms.
-- Paste this whole file into Supabase > SQL Editor > New query > Run.
-- Visitors (anon) may ADD rows only. They can never read, change or delete anything.

create table if not exists public.inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  email text,
  plan text not null default 'general',
  message text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.free_trial_passes (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  preferred_time text not null default 'morning',
  fitness_goal text not null default 'general_fitness',
  created_at timestamptz not null default now()
);

create table if not exists public.bmi_logs (
  id bigint generated always as identity primary key,
  gender text not null default 'unspecified',
  age integer,
  height_cm numeric not null,
  weight_kg numeric not null,
  bmi numeric not null,
  category text not null,
  target_weight numeric,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;
alter table public.free_trial_passes enable row level security;
alter table public.bmi_logs enable row level security;

drop policy if exists "public can submit inquiries" on public.inquiries;
create policy "public can submit inquiries" on public.inquiries
  for insert to anon, authenticated with check (true);

drop policy if exists "public can submit free trial passes" on public.free_trial_passes;
create policy "public can submit free trial passes" on public.free_trial_passes
  for insert to anon, authenticated with check (true);

drop policy if exists "public can submit bmi logs" on public.bmi_logs;
create policy "public can submit bmi logs" on public.bmi_logs
  for insert to anon, authenticated with check (true);

-- Only signed-in staff can read the leads in the Supabase dashboard / your own tools.
drop policy if exists "staff can read inquiries" on public.inquiries;
create policy "staff can read inquiries" on public.inquiries
  for select to authenticated using (true);
drop policy if exists "staff can read free trial passes" on public.free_trial_passes;
create policy "staff can read free trial passes" on public.free_trial_passes
  for select to authenticated using (true);
drop policy if exists "staff can read bmi logs" on public.bmi_logs;
create policy "staff can read bmi logs" on public.bmi_logs
  for select to authenticated using (true);
