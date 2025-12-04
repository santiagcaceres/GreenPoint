-- Insert the 6 genetics from the images provided
INSERT INTO public.genetics (slug, name, number, type, thc_percentage, cbd_percentage, image_url, description, flowering_time, effects) VALUES
(
  'golden-glove-1',
  'Golden Glove',
  '#1',
  'Estimulante',
  20.0,
  0.8,
  '/images/24.png',
  'Golden Glove #1 es una genética estimulante perfecta para uso diurno. Con 20% de THC, ofrece energía y creatividad.',
  '8-9 semanas',
  ARRAY['Energético', 'Creativo', 'Eufórico']
),
(
  'golden-glove-28',
  'Golden Glove',
  '#28',
  'Relajante, potente',
  29.6,
  0.7,
  '/images/27.png',
  'Golden Glove #28 es una variante relajante y muy potente con 29.6% de THC. Ideal para uso nocturno.',
  '9-10 semanas',
  ARRAY['Relajante', 'Potente', 'Sedante']
),
(
  'pina-tropical-6',
  'Piña Tropical',
  '#6',
  'Narcotico, eufórico',
  15.7,
  0.8,
  '/images/25.png',
  'Piña Tropical #6 con sabores tropicales y efectos narcóticos suaves. Perfecta para relajación.',
  '8-9 semanas',
  ARRAY['Narcótico', 'Eufórico', 'Tropical']
),
(
  'sheinbon-007',
  'SheinBon',
  '#007',
  'Relajante, muy potente',
  20.9,
  0.7,
  '/images/29.png',
  'SheinBon #007 es una genética relajante de alta potencia. Ideal para alivio de estrés y dolores.',
  '9-10 semanas',
  ARRAY['Relajante', 'Potente', 'Medicinal']
),
(
  'sheinbon-088',
  'SheinBon',
  '#088',
  'Relajante, cerebral',
  20.6,
  0.8,
  '/images/26.png',
  'SheinBon #088 ofrece un efecto cerebral relajante. Perfecta para meditación y creatividad.',
  '8-9 semanas',
  ARRAY['Relajante', 'Cerebral', 'Creativo']
),
(
  'pina-tropical-7',
  'Piña Tropical',
  '#7',
  'Proactivo, creativo',
  15.9,
  0.9,
  '/images/28.png',
  'Piña Tropical #7 con efectos proactivos y creativos. Excelente para uso diurno y actividades.',
  '8-9 semanas',
  ARRAY['Proactivo', 'Creativo', 'Energético']
);
