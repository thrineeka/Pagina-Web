<h3 align="left">Git y GitHub: 100 Comandos Esenciales 🐙</h3>

###

<p align="left">git init:            Inicializa un nuevo repositorio Git local en el directorio actual. Crea una subcarpeta .git con todos los archivos necesarios para el control de versiones.</p>

###

<p align="left">git clone <URL_repositorio>:          Clona un repositorio remoto existente en tu máquina local. Descarga una copia completa del proyecto, incluyendo todo su historial.</p>

###

<p align="left">git config --global user.name       Tu Nombre": Establece el nombre de usuario global para Git. Este nombre se asociará a todos tus commits.</p>

###

<p align="left">git config --global user.email "tu_email@example.com": Establece el correo electrónico global para Git. Este email también se vinculará a tus commits.</p>

###

<p align="left">git config --global --list: Muestra todas las configuraciones globales de Git (nombre, email, editor, etc.).</p>

###

<p align="left">git config user.name: Muestra el nombre de usuario configurado para el repositorio actual (configuración local).</p>

###

<p align="left">git config user.email: Muestra el correo electrónico configurado para el repositorio actual (configuración local).</p>

###

<p align="left">git config --local user.name "Tu Nombre Local": Establece el nombre de usuario solo para el repositorio actual.</p>

###

<p align="left">git config --local user.email "tu_email_local@example.com": Establece el correo electrónico solo para el repositorio actual.</p>

###

<p align="left">git help <comando>: Muestra la documentación detallada para un comando Git específico. Útil para entender las opciones de un comando.</p>

###

<h3 align="left">I. Trabajar con Archivos y Cambios</h3>

###

<p align="left">git status: Muestra el estado del árbol de trabajo y del área de preparación (staging area). Te informa qué archivos han sido modificados, cuáles están listos para ser confirmados y cuáles no están siendo rastreados.</p>

###

<p align="left">git add <archivo>: Agrega uno o más archivos específicos al área de preparación. Prepara los cambios de esos archivos para el próximo commit.</p>

###

<p align="left">git add .   --: Agrega todos los archivos nuevos y modificados en el directorio actual y subdirectorios al área de preparación. Es un atajo para incluir rápidamente todos los cambios.</p>

###

<p align="left">git add -u: Agrega al área de preparación solo los archivos modificados y eliminados que ya están siendo rastreados por Git. No incluye archivos nuevos no rastreados.</p>

###

<p align="left">git add -A: Equivalente a git add . en la raíz del repositorio, agregando todos los cambios (nuevos, modificados, eliminados).</p>

###

<p align="left">git rm <archivo>: Elimina un archivo del directorio de trabajo y del área de preparación. También registra la eliminación en el historial de Git.</p>

###

<p align="left">git rm --cached <archivo>: Elimina un archivo del área de preparación pero lo mantiene en el directorio de trabajo. Lo "deja de rastrear" sin borrarlo localmente.</p>

###

<p align="left">git mv <archivo_antiguo> <archivo_nuevo>: Renombra o mueve un archivo dentro del repositorio Git. Git registrará este cambio de nombre en el historial.</p>

###

<p align="left">git commit -m "Mensaje del commit": Guarda los cambios preparados (los que están en el staging area) en el historial del repositorio con un mensaje descriptivo.</p>

###

<p align="left">git commit: Abre un editor de texto para que escribas un mensaje de commit más detallado.</p>

###

<p align="left">git commit -am "Mensaje del commit": Una combinación de git add -u y git commit -m. Agrega y confirma los cambios de archivos ya rastreados en un solo paso.</p>

###

<p align="left">git commit --amend: Permite modificar el último commit. Puedes cambiar el mensaje o agregar/quitar cambios al commit anterior.</p>

###

<p align="left">git restore <archivo>: Descarta los cambios no confirmados (no en el staging area) en un archivo específico, restaurándolo a su estado del último commit.</p>

###

<p align="left">git restore .: Descarta todos los cambios no confirmados en el directorio de trabajo.</p>

###

<p align="left">git restore --staged <archivo>: Deshace git add para un archivo específico, moviéndolo del área de preparación al estado de "no preparado" (modified).</p>

###

<p align="left">git reset HEAD <archivo>: (Alternativa a git restore --staged) Deshace el git add de un archivo específico.</p>

###

<p align="left">git clean -n: Muestra una lista de archivos no rastreados que serían eliminados si se ejecutara git clean -f. Es un "simulacro" de limpieza.</p>

###

<p align="left">git clean -f: Elimina los archivos no rastreados del directorio de trabajo. ¡Cuidado, esta acción es destructiva y no se puede deshacer fácilmente!</p>

###

<p align="left">git clean -df: Elimina archivos no rastreados y directorios vacíos no rastreados.</p>

###

<h3 align="left">III. Ver Historial y Diferencias</h3>

###

<p align="left">git log: Muestra el historial de commits del repositorio, incluyendo el autor, fecha y mensaje de cada commit.</p>

###

<p align="left">git log --oneline: Muestra el historial de commits de forma concisa, con cada commit en una sola línea (SHA-1 corto y mensaje).</p>

###

<p align="left">git log --graph: Muestra el historial de commits como un gráfico ASCII, útil para visualizar ramas y fusiones.</p>

###

<p align="left">git log -p: Muestra el historial de commits junto con las diferencias introducidas en cada commit (el "parche" de cambios).</p>

###

<p align="left">git log --stat: Muestra el historial de commits con estadísticas resumidas de los archivos modificados (cuántas líneas agregadas/eliminadas).</p>

###

<p align="left">git log -n <número>: Muestra los últimos <número> de commits.</p>

###

<p align="left">git log --author="Tu Nombre": Muestra los commits realizados por un autor específico.</p>

###

<p align="left">git log --grep="palabra clave": Muestra los commits cuyo mensaje contenga la palabra clave especificada.</p>

###

<p align="left">git diff: Muestra las diferencias entre el árbol de trabajo y el área de preparación. Son los cambios que aún no has agregado al staging area.</p>

###

<p align="left">git diff --staged: Muestra las diferencias entre el área de preparación y el último commit. Son los cambios que están listos para ser confirmados.</p>

###

<p align="left">git diff HEAD: Muestra las diferencias entre el árbol de trabajo y el último commit. Es la combinación de git diff y git diff --staged.</p>

###

<p align="left">git diff <commit1> <commit2>: Muestra las diferencias entre dos commits específicos. Útil para comparar versiones del código.</p>

###

<p align="left">git diff <rama1> <rama2>: Muestra las diferencias entre las puntas de dos ramas.</p>

###

<p align="left">git show <commit_id>: Muestra los detalles de un commit específico, incluyendo su mensaje, autor y los cambios introducidos.</p>

###

<p align="left">git shortlog: Muestra un resumen de los commits, agrupados por autor y con sus mensajes.</p>

###

<h3 align="left">IV. Ramas (Branches)</h3>

###

<p align="left">git branch: Lista todas las ramas locales en el repositorio. La rama actual se marca con un asterisco.</p>

###
