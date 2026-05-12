const router = require('express').Router();
const ctrl = require('../controllers/project.controller');

/**
 * @openapi
 * tags:
 *   name: Projects
 *   description: Project management endpoints
 */

/**
 * @openapi
 * /projects:
 *   get:
 *     tags: [Projects]
 *     summary: List projects (optional search & status filter)
 *     security: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by project name (case-insensitive)
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [pending, active, completed] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 10 }
 *     responses:
 *       200:
 *         description: Paginated project list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Project' }
 *                 page: { type: integer }
 *                 limit: { type: integer }
 *                 total: { type: integer }
 *                 totalPages: { type: integer }
 *   post:
 *     tags: [Projects]
 *     summary: Create a new project
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: Website Redesign }
 *               description: { type: string }
 *               status: { type: string, enum: [pending, active, completed] }
 *               start_date: { type: string, format: date }
 *               end_date: { type: string, format: date }
 *     responses:
 *       201:
 *         description: Project created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Project' }
 */
router.get('/', ctrl.list);
router.post('/', ctrl.create);


/**
 * @openapi
 * /projects/{id}:
 *   get:
 *     tags: [Projects]
 *     summary: Get project by ID
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Project found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Project' }
 *       404: { description: Not found }
 *   put:
 *     tags: [Projects]
 *     summary: Update project
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Project' }
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Project' }
 *   delete:
 *     tags: [Projects]
 *     summary: Delete project
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 */
router.get('/:id', ctrl.getOne);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
