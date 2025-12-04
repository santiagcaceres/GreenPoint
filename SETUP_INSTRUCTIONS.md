# Instrucciones de Configuración - Greenpoint E-commerce

## 1. Configurar Base de Datos Supabase

### Paso 1: Ejecutar Scripts SQL

En el panel de Supabase, ve a **SQL Editor** y ejecuta los siguientes scripts en orden:

1. **001_create_database_schema.sql** - Crea todas las tablas (profiles, genetics, orders, order_items)
2. **002_seed_initial_genetics.sql** - Inserta las 6 genéticas iniciales con sus imágenes
3. Después de crear tu usuario admin manualmente, ejecuta **003_create_admin_user.sql** (actualiza el email en el script)

### Paso 2: Verificar Row Level Security (RLS)

Todas las tablas tienen políticas de seguridad RLS configuradas:
- `profiles`: Los usuarios solo ven su propio perfil, admins ven todos
- `genetics`: Todos pueden leer, solo admins pueden crear/editar/eliminar
- `orders` y `order_items`: Los usuarios solo ven sus propios pedidos, admins ven todos

## 2. Configurar Variables de Entorno

Necesitas agregar las siguientes variables de entorno en tu proyecto:

\`\`\`env
# Supabase (ya configuradas)
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# Supabase Redirect URL para desarrollo
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Resend para emails
RESEND_API_KEY=tu_resend_api_key

# Mercado Pago
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=tu_public_key
MERCADOPAGO_ACCESS_TOKEN=tu_access_token
\`\`\`

## 3. Configurar Resend para Emails

1. Crea una cuenta en [Resend](https://resend.com)
2. Verifica tu dominio o usa el dominio de prueba
3. Crea una API key y agrégala a las variables de entorno como `RESEND_API_KEY`
4. Los emails de bienvenida se enviarán automáticamente al registrarse

## 4. Configurar Mercado Pago

1. Crea una cuenta en [Mercado Pago Developers](https://www.mercadopago.com.uy/developers)
2. Ve a "Tus credenciales" y copia:
   - **Public Key** → `NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY`
   - **Access Token** → `MERCADOPAGO_ACCESS_TOKEN`
3. Configura las URLs de notificación (webhooks) en tu panel de Mercado Pago:
   - URL de notificación: `https://tu-dominio.com/api/webhook/mercadopago`

## 5. Crear Usuario Administrador

### Opción A: Registro Manual
1. Ve a `/auth/sign-up` y regístrate con tu email de admin
2. En Supabase, ve a **SQL Editor** y ejecuta:
   \`\`\`sql
   UPDATE public.profiles 
   SET is_admin = true 
   WHERE email = 'tu-email@admin.com';
   \`\`\`

### Opción B: Desde Supabase Auth Dashboard
1. En Supabase, ve a **Authentication > Users**
2. Crea un usuario manualmente con tu email
3. Ejecuta el mismo SQL del paso anterior para hacerlo admin

## 6. Acceder al Sistema

### Como Cliente:
- **Registro**: `/auth/sign-up`
  - Debes tener +18 años (validación automática)
  - Recibirás un email de bienvenida
  - No necesitas verificar email
- **Login**: `/auth/login`
- **Ver productos**: `/` (página principal)
- **Ver pedidos**: `/my-orders`
- **Carrito**: `/cart`

### Como Administrador:
- **Login**: `/auth/login` (mismo que clientes)
- **Panel admin**: `/admin`
  - Dashboard con estadísticas
  - Gestión de genéticas (crear, editar, eliminar)
  - Gestión de pedidos (ver todos, cambiar estados)

## 7. Flujo de Compra

1. Cliente agrega productos al carrito
2. Va a `/cart` y hace checkout
3. Se redirige a `/checkout` para completar datos de envío
4. Se crea preferencia en Mercado Pago
5. Cliente completa el pago
6. Webhook de Mercado Pago actualiza el estado del pedido
7. Cliente puede ver su pedido en `/my-orders`
8. Admin puede ver y gestionar el pedido en `/admin/orders`

## 8. Gestión de Genéticas (Admin)

El administrador puede:
- Ver todas las genéticas en `/admin/genetics`
- Crear nuevas en `/admin/genetics/new`
- Editar existentes en `/admin/genetics/[id]/edit`
- Eliminar genéticas (con confirmación)
- Subir imágenes mediante URL

### Campos requeridos para crear una genética:
- Nombre
- Número (ej: #1, #28)
- Tipo (Estimulante, Relajante, etc.)
- THC % (porcentaje de THC)
- CBD % (porcentaje de CBD)
- URL de imagen
- Descripción
- Tiempo de floración
- Efectos (separados por comas)

## 9. Pruebas

### Probar emails (desarrollo):
Resend proporciona un dominio de prueba que puedes usar sin verificar tu dominio.

### Probar pagos (Mercado Pago):
Usa las credenciales de prueba de Mercado Pago:
- [Tarjetas de prueba](https://www.mercadopago.com.uy/developers/es/docs/checkout-api/additional-content/test-cards)

## 10. Solución de Problemas

### Los emails no llegan:
- Verifica que `RESEND_API_KEY` esté configurada
- Revisa los logs en el dashboard de Resend

### Error de acceso admin:
- Verifica que el usuario tenga `is_admin = true` en la tabla profiles
- Cierra sesión y vuelve a iniciar

### Pagos no funcionan:
- Verifica las credenciales de Mercado Pago
- Asegúrate de usar las credenciales correctas (prueba vs producción)
- Verifica que la URL del webhook esté configurada en Mercado Pago

### RLS bloquea acceso:
- Verifica que las políticas RLS estén creadas correctamente
- Asegúrate de estar autenticado con el usuario correcto
