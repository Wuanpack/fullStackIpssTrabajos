# Buenas Prácticas de Desarrollo Frontend

1. Uso de JavaScript modular mediante `import` y `export` para separar responsabilidades.
2. Separación clara entre lógica de negocio (consumo de API) y presentación (componentes).
3. Uso exclusivo de DOM nativo sin plantillas estáticas ni frameworks externos.
4. Nombres de funciones y variables descriptivos y coherentes con su responsabilidad.
5. Aplicación de estilos dinámicos mediante clases CSS en lugar de estilos inline.
6. Uso de variables CSS y clases Tailwind para manejar colores provenientes del backend.
7. Manejo centralizado de errores en el consumo de la API (`try/catch`).
8. Renderizado defensivo ante listas vacías o datos inválidos.
9. Uso de HTML semántico (`main`, `section`, `article`, `header`) para mejorar accesibilidad.
10. Inclusión de atributos ARIA para mejorar la experiencia con lectores de pantalla.
11. Código organizado por carpetas según su función (CSS, JS, componentes).
12. Evitar duplicación de código reutilizando componentes.
13. Uso adecuado de `const` y `let` según el alcance de las variables.
14. Compatibilidad con distintos tamaños de pantalla mediante CSS Grid.
15. Integración clara y documentada con la API REST desarrollada en Backend.