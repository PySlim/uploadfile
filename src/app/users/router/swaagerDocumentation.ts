/**
 * @swagger
 * tags:
 *   name: FileUpload
 *   description: Gestor de carga de usuarios a partir de archivos en formato csv.
 */

/**
 * @swagger
 * /user/sign:
 *   post:
 *     summary: Registrar un usuario
 *     description: End point para el registro de un usuario.
 *     tags: [User]
 *     requestBody:
 *      description: Nombre de usuario se requiere que tenga como minimo 2 caracteres y como maximo 150 | el email
 *       debe ser de  caracter único ya que es el identificador de usuario. | El role admite solo dos valores posibles
 *       admin o user. | age resgistra la edad del usuario asume un minimo de 15 y un maximo de 90. | password es la clave de acceso del usuario no puede tener menos de 8 caracteres y como maximo 150.

 *      content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado con exito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ErrorSchemaLack'
 *                 - $ref: '#/components/schemas/ErrorSchemaWrong'
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario.
 *         role:
 *           type: string
 *           description: Rol del usuario.
 *         email:
 *           type: string
 *           description: Correo electrónico.
 *         age:
 *           type: number
 *           description: Edad del usuario.
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
 *
 *     ErrorSchemaLack:
 *       type: object
 *       properties:
 *         name:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Name is required."
 *         role:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Role is required."
 *         email:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Email is required."
 *         age:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Age is required."
 *         password:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Password is required"
 *     ErrorSchemaWrong:
 *       type: object
 *       properties:
 *         name:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Name should be a valid string of at least two characters."
 *         role:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Is only possible admin or user role."
 *         email:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Email should be a valid email."
 *         age:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Age should be a valid integer"
 *         password:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "Password should be a valid string."
 *     UserResponse:
 *       type: object
 *       properties:
 *         ok:
 *           type: boolean
 *           description: Indica si la operación fue exitosa o no.
 *         message:
 *           type: string
 *           description: Mensaje del estado de la operación.
 *         data:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: Id del usuario.
 *               name:
 *                 type: string
 *                 description: Nombre del usuario.
 *               role:
 *                 type: string
 *                 description: Rol del usuario.
 *               email:
 *                 type: string
 *                 description: Identificador del usuario.
 *               age:
 *                  type: number
 *                  description: Edad del usuario
 *               token:
 *                 type: string
 *                 description: Llave codificada de identificador de usuario.
 *         pagination:
 *           type: object
 *           description: Objeto de paginación .
 */
