# Acceso al Panel de Administración

## Credenciales de Administrador

- **URL de acceso**: `/admin/login`
- **Usuario**: adminGreenpoint
- **Email**: admin@greenpoint.com
- **Contraseña**: admin123

## Configuración Inicial

### 1. Crear el Usuario Admin en Supabase

1. Ve a tu proyecto de Supabase
2. Navega a: **Authentication** > **Users**
3. Haz clic en **"Add user"** > **"Create new user"**
4. Ingresa los siguientes datos:
   - **Email**: `admin@greenpoint.com`
   - **Password**: `admin123`
   - **Auto Confirm User**: ✅ Marca esta casilla (importante)
5. Haz clic en **"Create user"**

### 2. Otorgar Permisos de Administrador

Después de crear el usuario, ejecuta el script SQL `003_create_admin_user.sql`:

\`\`\`sql
UPDATE public.profiles 
SET 
  is_admin = true,
  full_name = 'Administrador Greenpoint'
WHERE email = 'admin@greenpoint.com';
\`\`\`

### 3. Verificar Acceso

1. Ve a: `https://tu-dominio.com/admin/login`
2. Ingresa:
   - **Usuario**: adminGreenpoint o admin@greenpoint.com
   - **Contraseña**: admin123
3. Deberías ser redirigido al panel de administración

## Características del Panel Admin

Una vez autenticado, tendrás acceso a:

- **Dashboard**: Vista general de estadísticas y pedidos recientes
- **Genéticas**: Crear, editar y eliminar genéticas con imágenes
- **Pedidos**: Ver y gestionar todos los pedidos de clientes
- **Cambiar estados**: Actualizar el estado de los pedidos en tiempo real

## Seguridad

- El panel admin está protegido por middleware
- Solo usuarios con `is_admin = true` pueden acceder
- Las rutas `/admin/*` requieren autenticación
- Los usuarios regulares son redirigidos si intentan acceder

## Cambiar Contraseña (Recomendado)

Para mayor seguridad, se recomienda cambiar la contraseña después del primer acceso:

1. Ve a Supabase Dashboard > Authentication > Users
2. Encuentra el usuario admin@greenpoint.com
3. Haz clic en los tres puntos > "Reset password"
4. Establece una nueva contraseña segura
