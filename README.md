# Greenpoint - E-commerce de Genéticas de Cannabis

E-commerce completo para venta de plantas de marihuana con panel de administración, autenticación y pasarela de pagos.

## Características

- **Carrusel interactivo** de 6 genéticas con efectos visuales
- **Panel de administración** completo para gestionar genéticas y pedidos
- **Autenticación** con Supabase (email/password)
- **Carrito de compras** con persistencia
- **Pasarela de pagos** con Mercado Pago
- **Base de datos** Supabase con Row Level Security
- **Dos modalidades de venta**: En Maceta (1, 5, 10 plantas) y En Domo (25, 50, 100 plantas)

## Stack Tecnológico

- **Framework**: Next.js 16 con App Router
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Pagos**: Mercado Pago
- **Estilos**: Tailwind CSS v4
- **Componentes**: shadcn/ui
- **Estado**: Zustand (carrito)
- **Carrusel**: Embla Carousel

## Configuración Inicial

### 1. Variables de Entorno

Ya están configuradas en Vercel:
- `SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Necesitas agregar:**
- `MERCADOPAGO_ACCESS_TOKEN` - Tu token de acceso de Mercado Pago
- `NEXT_PUBLIC_URL` - URL de tu aplicación (ej: https://tu-dominio.vercel.app)
- `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` - URL para desarrollo (opcional, ej: http://localhost:3000)

### 2. Ejecutar Scripts SQL

Los scripts SQL en `/scripts` deben ejecutarse en orden:

1. **001_create_database_schema.sql** - Crea todas las tablas y políticas RLS
2. **002_seed_initial_genetics.sql** - Inserta las 6 genéticas iniciales

**Para ejecutarlos en v0:**
- Los scripts se ejecutan automáticamente desde la interfaz de v0
- No necesitas ir al dashboard de Supabase

### 3. Crear Usuario Administrador

Después de ejecutar los scripts, necesitas crear un usuario admin:

1. Ve a `/auth/sign-up` y registra una cuenta
2. Copia el `user_id` de tu perfil
3. En Supabase SQL Editor, ejecuta:
\`\`\`sql
UPDATE profiles 
SET is_admin = true 
WHERE id = 'tu-user-id-aqui';
\`\`\`

## Estructura del Proyecto

\`\`\`
app/
├── page.tsx                    # Página principal con carrusel
├── genetics/[slug]/page.tsx    # Detalle de cada genética
├── cart/page.tsx               # Carrito de compras
├── checkout/page.tsx           # Finalizar compra
├── my-orders/page.tsx          # Pedidos del cliente
├── admin/
│   ├── page.tsx               # Dashboard admin
│   ├── genetics/              # CRUD de genéticas
│   └── orders/                # Gestión de pedidos
└── auth/
    ├── login/                 # Inicio de sesión
    └── sign-up/               # Registro

components/
├── genetics-carousel.tsx      # Carrusel principal
├── header.tsx                 # Header con autenticación
├── cart-button.tsx            # Botón del carrito
└── admin-nav.tsx              # Navegación admin

lib/
├── supabase/                  # Clientes Supabase
├── mercadopago.ts            # Integración Mercado Pago
└── cart-store.ts             # Estado del carrito

scripts/
├── 001_create_database_schema.sql
└── 002_seed_initial_genetics.sql
\`\`\`

## Uso

### Cliente
1. Navega por el carrusel de genéticas
2. Haz clic en una genética para ver detalles
3. Selecciona modalidad (Maceta/Domo) y cantidad
4. Agrega al carrito y procede al checkout
5. Completa el pago con Mercado Pago
6. Ve tus pedidos en "Mis Pedidos"

### Administrador
1. Inicia sesión con cuenta admin
2. Accede a `/admin`
3. Dashboard con estadísticas y pedidos recientes
4. Gestiona genéticas: crear, editar, eliminar (con fotos)
5. Actualiza estados de pedidos

## Configuración de Mercado Pago

### 1. Obtener Access Token

1. Crea una cuenta en [Mercado Pago](https://www.mercadopago.com.uy)
2. Ve a [Credenciales](https://www.mercadopago.com.uy/developers/panel/credentials)
3. Copia el "Access Token" de prueba o producción
4. Agrégalo como variable de entorno `MERCADOPAGO_ACCESS_TOKEN`

### 2. Configurar Webhook (Opcional para producción)

Para recibir notificaciones automáticas de pagos:

1. En el panel de Mercado Pago, ve a Webhooks
2. Configura la URL: `https://tu-dominio.vercel.app/api/webhook/mercadopago`
3. El webhook actualizará automáticamente el estado de los pedidos

## Base de Datos

### Tablas

- **profiles** - Perfiles de usuario con rol admin
- **genetics** - Catálogo de genéticas
- **orders** - Pedidos de clientes
- **order_items** - Items de cada pedido

### Seguridad

Todas las tablas tienen Row Level Security (RLS):
- Los clientes solo ven sus propios pedidos
- Los admins tienen acceso completo
- Las genéticas son públicas para lectura

## Modalidades de Venta

### En Maceta
- 1 planta
- 5 plantas (descuento)
- 10 plantas (mayor descuento)

### En Domo
- Mínimo 25 plantas
- 50 plantas (precio preferencial)
- 100 plantas (precio mayorista)

## Desarrollo Local

\`\`\`bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en http://localhost:3000
\`\`\`

## Despliegue

El proyecto está listo para desplegarse en Vercel:

1. Conecta tu repositorio en Vercel
2. Configura las variables de entorno
3. Despliega

## Soporte

Para cualquier problema, revisa:
1. Variables de entorno configuradas correctamente
2. Scripts SQL ejecutados en orden
3. Usuario admin creado en la base de datos
4. Access Token de Mercado Pago válido
