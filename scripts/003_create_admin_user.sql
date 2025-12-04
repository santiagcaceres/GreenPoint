-- Script para crear el usuario administrador
-- Usuario: adminGreenpoint
-- Contraseña: admin123
-- Email: admin@greenpoint.com

-- INSTRUCCIONES:
-- 1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard/project/YOUR_PROJECT/auth/users
-- 2. Haz clic en "Add user" > "Create new user"
-- 3. Ingresa:
--    - Email: admin@greenpoint.com
--    - Password: admin123
--    - Confirma el email automáticamente (marca la casilla)
-- 4. Copia el UUID del usuario creado
-- 5. Ejecuta este script reemplazando 'USER_UUID_AQUI' con el UUID copiado

-- Actualiza el perfil para hacerlo administrador
UPDATE public.profiles 
SET 
  is_admin = true,
  full_name = 'Administrador Greenpoint'
WHERE id = 'USER_UUID_AQUI';

-- O si prefieres buscar por email:
UPDATE public.profiles 
SET 
  is_admin = true,
  full_name = 'Administrador Greenpoint'
WHERE email = 'admin@greenpoint.com';

-- Verificar que el usuario admin fue creado correctamente:
SELECT id, email, full_name, is_admin, created_at 
FROM public.profiles 
WHERE email = 'admin@greenpoint.com';
