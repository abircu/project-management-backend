const pool = require('../config/db');

const ALLOWED_STATUS = ['pending', 'active', 'completed'];

exports.list = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    const page = Math.max(1, parseInt(String(req.query.page), 10) || 1);
    const limitRaw = parseInt(String(req.query.limit), 10) || 10;
    const limit = Math.min(100, Math.max(1, limitRaw));
    const offset = (page - 1) * limit;

    const where = [];
    const params = [];

    if (search) {
      where.push('name LIKE ?');
      params.push(`%${search}%`);
    }
    if (status && ALLOWED_STATUS.includes(status)) {
      where.push('status = ?');
      params.push(status);
    }

    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const [countRows] = await pool.query(
      `SELECT COUNT(*) AS total FROM projects ${whereSql}`,
      params
    );
    const total = Number(countRows[0]?.total) || 0;

    const [rows] = await pool.query(
      `SELECT * FROM projects ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    const totalPages = total > 0 ? Math.ceil(total / limit) : 0;
    res.json({
      data: rows,
      page,
      limit,
      total,
      totalPages,
    });
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (!rows[0]) return res.status(404).json({ message: 'Project not found' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name, description, status, start_date, end_date } = req.body;
    if (!name) return res.status(400).json({ message: 'name is required' });

    const [result] = await pool.query(
      `INSERT INTO projects (name, description, status, start_date, end_date, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [name, description || null, status || 'pending', start_date || null, end_date || null]
    );
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { name, description, status, start_date, end_date } = req.body;
    const [result] = await pool.query(
      `UPDATE projects
       SET name=?, description=?, status=?, start_date=?, end_date=?, updated_at=NOW()
       WHERE id=?`,
      [name, description || null, status, start_date || null, end_date || null, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ message: 'Project not found' });
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

exports.getTasks = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM abc');
    res.json(rows);
  } catch (err) { next(err); }
};