import bcrypt from 'bcryptjs';
import { db } from '../config/db.js';

const TABLE_NAME = 'users';

class User {
  // Create a new user
  static async create({ name, email, password, role = 'user' }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db(TABLE_NAME)
      .insert({
        name,
        email: email.toLowerCase(),
        password_hash: hashedPassword, // ✅ correct column
        role,
        created_at: db.fn.now(),
        updated_at: db.fn.now()
      })
      .returning(['id', 'name', 'email', 'role', 'created_at']);
    return user;
  }

  // Find user by email
  static async findByEmail(email) {
    return db(TABLE_NAME).where({ email: email.toLowerCase() }).first();
  }

  // Find user by ID
  static async findById(id) {
    return db(TABLE_NAME)
      .where({ id })
      .select('id', 'name', 'email', 'role', 'created_at')
      .first();
  }

  // Find user by ID including password hash (used for sensitive operations)
  static async findWithPasswordById(id) {
    return db(TABLE_NAME)
      .where({ id })
      .first();
  }

  // Verify password
  static async verifyPassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  // Update user password
  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db(TABLE_NAME)
      .where({ id })
      .update({ 
        password_hash: hashedPassword, // ✅ correct column
        updated_at: db.fn.now() 
      });
  }

  // Check if email exists
  static async emailExists(email) {
    const user = await this.findByEmail(email);
    return !!user;
  }

  // Update user profile
  static async update(id, updateData) {
    const [user] = await db(TABLE_NAME)
      .where({ id })
      .update({
        ...updateData,
        updated_at: db.fn.now()
      })
      .returning(['id', 'name', 'email', 'phone', 'role', 'created_at', 'updated_at']);
    
    return user;
  } 
}

export default User;
