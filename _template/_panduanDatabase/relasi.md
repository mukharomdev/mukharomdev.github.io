Relasi dalam database adalah cara tabel-tabel dalam database saling terhubung. Ada beberapa jenis relasi yang umum digunakan, yaitu:

1. **One-to-One (1:1)**
2. **One-to-Many (1:N)**
3. **Many-to-Many (N:M)**

Berikut penjelasan lengkap untuk masing-masing relasi:

---

### 1. **One-to-One (1:1)**
Relasi one-to-one terjadi ketika satu record di tabel A hanya terkait dengan satu record di tabel B, dan sebaliknya.

#### Contoh:
- **Tabel `User`** dan **Tabel `Profile`**:
  - Setiap user hanya memiliki satu profile.
  - Setiap profile hanya dimiliki oleh satu user.

#### Implementasi di Database:
- Tambahkan foreign key di salah satu tabel (biasanya di tabel yang lebih "lemah" atau opsional).
- Contoh:
  ```sql
  CREATE TABLE Users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50)
  );

  CREATE TABLE Profiles (
      id SERIAL PRIMARY KEY,
      userId INT UNIQUE, -- Foreign key dengan constraint UNIQUE
      address TEXT,
      FOREIGN KEY (userId) REFERENCES Users(id)
  );
  ```

#### Implementasi di Sequelize:
```javascript
const User = sequelize.define('User', {
  username: DataTypes.STRING,
});

const Profile = sequelize.define('Profile', {
  address: DataTypes.TEXT,
});

// Relasi One-to-One
User.hasOne(Profile); // User memiliki satu Profile
Profile.belongsTo(User); // Profile dimiliki oleh satu User
```

---

### 2. **One-to-Many (1:N)**
Relasi one-to-many terjadi ketika satu record di tabel A dapat terkait dengan banyak record di tabel B, tetapi satu record di tabel B hanya terkait dengan satu record di tabel A.

#### Contoh:
- **Tabel `User`** dan **Tabel `Post`**:
  - Satu user dapat memiliki banyak post.
  - Setiap post hanya dimiliki oleh satu user.

#### Implementasi di Database:
- Tambahkan foreign key di tabel yang memiliki banyak record (biasanya tabel "banyak").
- Contoh:
  ```sql
  CREATE TABLE Users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50)
  );

  CREATE TABLE Posts (
      id SERIAL PRIMARY KEY,
      userId INT, -- Foreign key
      content TEXT,
      FOREIGN KEY (userId) REFERENCES Users(id)
  );
  ```

#### Implementasi di Sequelize:
```javascript
const User = sequelize.define('User', {
  username: DataTypes.STRING,
});

const Post = sequelize.define('Post', {
  content: DataTypes.TEXT,
});

// Relasi One-to-Many
User.hasMany(Post); // User memiliki banyak Post
Post.belongsTo(User); // Post dimiliki oleh satu User
```

---

### 3. **Many-to-Many (N:M)**
Relasi many-to-many terjadi ketika satu record di tabel A dapat terkait dengan banyak record di tabel B, dan sebaliknya.

#### Contoh:
- **Tabel `Student`** dan **Tabel `Course`**:
  - Satu student dapat mengambil banyak course.
  - Satu course dapat diambil oleh banyak student.

#### Implementasi di Database:
- Gunakan **tabel perantara (junction table)** untuk menghubungkan kedua tabel.
- Contoh:
  ```sql
  CREATE TABLE Students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50)
  );

  CREATE TABLE Courses (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100)
  );

  -- Tabel perantara
  CREATE TABLE StudentCourses (
      studentId INT,
      courseId INT,
      PRIMARY KEY (studentId, courseId),
      FOREIGN KEY (studentId) REFERENCES Students(id),
      FOREIGN KEY (courseId) REFERENCES Courses(id)
  );
  ```

#### Implementasi di Sequelize:
```javascript
const Student = sequelize.define('Student', {
  name: DataTypes.STRING,
});

const Course = sequelize.define('Course', {
  title: DataTypes.STRING,
});

// Relasi Many-to-Many
Student.belongsToMany(Course, { through: 'StudentCourses' }); // Student dapat mengambil banyak Course
Course.belongsToMany(Student, { through: 'StudentCourses' }); // Course dapat diambil oleh banyak Student
```

---

### 4. **Perbedaan Utama Antar Relasi**
| **Relasi**       | **Deskripsi**                                                                 | **Contoh**                          |
|-------------------|-------------------------------------------------------------------------------|-------------------------------------|
| **One-to-One**    | Satu record di tabel A terkait dengan satu record di tabel B, dan sebaliknya.  | User dan Profile                   |
| **One-to-Many**   | Satu record di tabel A terkait dengan banyak record di tabel B.                | User dan Post                      |
| **Many-to-Many**  | Banyak record di tabel A terkait dengan banyak record di tabel B.              | Student dan Course                 |

---

### 5. **Kapan Menggunakan Relasi Tersebut?**
- **One-to-One**: Ketika data dapat dipisah menjadi dua tabel, tetapi setiap record hanya memiliki satu hubungan.
- **One-to-Many**: Ketika satu entitas memiliki banyak entitas terkait (misalnya, satu user memiliki banyak post).
- **Many-to-Many**: Ketika banyak entitas dari satu tabel terkait dengan banyak entitas dari tabel lain (misalnya, banyak student mengambil banyak course).

---

Jika Anda membutuhkan contoh lebih detail atau implementasi spesifik, silakan beri tahu! 😊