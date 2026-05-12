# 🌟 Retrospectiva — Sprint 1

**Proyecto:** LuBo — Marketplace de recursos para diseño de indumentaria  
**Dinámica:** Estrella de Mar

---

## ⬆️ Comenzar a hacer

- Definir las historias de usuario desde el principio, antes de arrancar con los wireframes.
- Usar el tablero de trabajo (GitHub Projects) desde el día uno para no perder el hilo.
- Establecer convenciones de nombres de archivos y carpetas al inicio del sprint.

---

## ➕ Hacer más

- Investigar más referentes visuales antes de tomar decisiones de diseño.
- Pedir feedback externo sobre los wireframes antes de darlos por terminados.
- Documentar decisiones de diseño en el README para que quede registro del razonamiento.

---

## ✅ Continuar haciendo

- Mantener el README actualizado y bien estructurado con toda la info del proyecto.
- Elegir referentes reales y específicos del nicho (no sitios genéricos).
- Pensar en la accesibilidad desde el diseño (paleta apta para daltonismo).

---

## ➖ Hacer menos

- Gastar tiempo en detalles de color y tipografía antes de validar la estructura general.
- Procrastinar la creación del repositorio (tendría que haber estado listo desde el día 1).

---

## 🛑 Dejar de hacer

- Diseñar sin tener claro el flujo de navegación entre páginas.
- Tomar decisiones de diseño sin revisar primero los wireframes.

---

## 📝 Conclusión general

El Sprint 1 fue útil para sentar las bases del proyecto. La temática quedó bien definida y los referentes ayudaron mucho a tener claridad visual. Para el Sprint 2 el foco va a estar en trasladar esos wireframes a HTML y CSS real, con buenas prácticas desde el principio: semántica correcta, estilos organizados y el tablero de trabajo activo.

---

# 🌟 Retrospectiva — Sprint 2

**Proyecto:** LuBo — Marketplace de recursos para diseño de indumentaria  
**Dinámica:** Estrella de Mar

---

## ⬆️ Comenzar a hacer

- Hacer commits frecuentes con mensajes descriptivos usando prefijos convencionales (feat:, fix:, docs:, etc.).
- Documentar las historias de usuario en el tablero antes de empezar a codear.
- Actualizar el README al final de cada sprint reflejando los cambios realizados.

---

## ➕ Hacer más

- Detallar el contenido de las carpetas del proyecto (como `/design`) en el README para que quede claro qué hay en cada una.
- Documentar las decisiones de UX en el repositorio para dejar registro del razonamiento.
- Incluir el user persona en los entregables de diseño desde el inicio del sprint.

---

## ✅ Continuar haciendo

- Definir una temática clara y diferenciada desde el principio del sprint.
- Cubrir todos los flujos principales en los wireframes (home, detalle, carrito, registro y login).
- Tomar decisiones de accesibilidad desde el diseño (paleta apta para daltonismo).
- Seleccionar referentes reales y específicos del nicho para orientar las decisiones visuales.

---

## ➖ Hacer menos

- Acumular cambios en pocos commits grandes en lugar de ir commiteando de forma atómica.
- Asumir los requisitos sin revisar en detalle las consignas antes de arrancar.

---

## 🛑 Dejar de hacer

- Dejar la documentación para el final del sprint.
- Tomar decisiones de diseño sin tener el user persona definido.

---

## 📝 Conclusión general

El Sprint 2 consolidó la identidad visual del proyecto y completó el maquetado de las páginas principales. La paleta, los wireframes y los referentes quedaron bien definidos. Para el Sprint 3 el foco va a estar en agregar dinamismo al sitio con Express y EJS: separar los componentes repetidos en partials, organizar las vistas en carpetas y conectar todo con controladores y rutas.

---

---

# 🌟 Retrospectiva — Sprint 3

**Proyecto:** LuBo — Marketplace de recursos para diseño de indumentaria  
**Dinámica:** Estrella de Mar

---

## ⬆️ Comenzar a hacer

- Verificar que los formularios apunten a las rutas correctas antes de dar por cerrado un sprint.
- Revisar que el README esté actualizado al final de cada sprint.
- Testear el flujo completo (crear, editar, eliminar) antes de mergear a main.

---

## ➕ Hacer más

- Aprovechar los partials de EJS para reducir aún más la duplicación de código.
- Revisar la consistencia entre la documentación (README) y el código real.
- Hacer pruebas manuales después de cada merge para detectar errores de integración.

---

## ✅ Continuar haciendo

- Usar branches y pull requests para cada feature o fix.
- Mantener mensajes de commit con prefijos convencionales (feat:, fix:, docs:, chore:).
- Separar la lógica en controladores y rutas siguiendo MVC.
- Usar EJS con includes para head, header y footer.

---

## ➖ Hacer menos

- Dejar formularios con action="#" como placeholder sin reemplazarlo por la ruta real.
- Hardcodear datos en las vistas cuando ya existe una fuente de datos disponible.

---

## 🛑 Dejar de hacer

- Asumir que el README del sprint anterior sigue siendo válido sin revisarlo.
- Mezclar datos estáticos (.js) con la lógica de controladores sin una capa de abstracción.

---

## 📝 Conclusión general

El Sprint 3 logró migrar el sitio a Express + EJS con una arquitectura MVC clara. Los partials eliminaron duplicación de código y las rutas/controladores organizaron bien la lógica. Los puntos débiles fueron la consistencia documental (README desactualizado, tipografía incorrecta) y los formularios con action="#" que no apuntaban a rutas reales. Para el Sprint 4 el foco está en pasar a JSON como fuente de datos, implementar persistencia con fs y completar el CRUD con métodos PUT y DELETE.