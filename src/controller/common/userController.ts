import { AppDataSource } from "../../data-source";
import { User, UserType } from "../../entity/common/User";
import { signInToken } from "../../config/auth";

const adminRepository = AppDataSource.getRepository(User);

//ALTA, BAJA, MODIFICACION, EXISTENCIA, OBTENER
export const loginAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await AppDataSource.createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.userType = 'admin' AND user.email = :email", {
        email: email,
      })
      .getOne();
    if (
      admin &&
      req.body.password ==
        admin.password /*&& bcrypt.compareSync(req.body.password, admin.password)*/
    ) {
      const token = signInToken(admin);
      res.json({
        token,
        id: admin.id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        contactNumber: admin.contactNumber,
        email: admin.email,
        userType: admin.userType,
      });
    } else {
      res.status(401).json({
        message: "Invalid Admin or password, or you are not an admin!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email } = req.body.email;
    const admin = await AppDataSource.createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.email = :email", { email: email })
      .getOne();
    if (admin /*&& bcrypt.compareSync(req.body.password, admin.password)*/) {
      const token = signInToken(admin);
      res.json({
        token,
        id: admin.id,
        name: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        UserType: admin.userType,
      });
    } else {
      res.status(401).json({
        message: "Invalid Admin or password!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = Number(req.body.id);
    const user = await User.findOneBy({ id: id });
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const existUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await adminRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .getOne();

    if (user != undefined) res.json(true);
    else res.json(false);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const createUser = async (req, res) => {
  const user = new User();
  console.log(req.body.email);
  user.email = String(req.body.email);
  user.userName = String(req.body.userName);
  user.firstName = String(req.body.firstName);
  user.activationEndDate = new Date(String(req.body.activationEndDate));
  user.activationStartDate = new Date(String(req.body.activationStartDate));
  user.contactNumber = String(req.body.contactNumber);
  user.lastName = String(req.body.lastName);
  //user.password = bcrypt.hashSync(password, saltRounds);
  user.password = String(req.body.password);

  if (String(req.body.userType).match("teacher"))
    user.userType = UserType.TEACHER;
  else if (req.body.userType.match("user")) user.userType = UserType.USER;
  else if (req.body.userType.match("admin")) user.userType = UserType.ADMIN;
  try {
    await user.save();
    res.json(true);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log("prueba fecha" + req.body.activationEndDate);

    await adminRepository
      .createQueryBuilder()
      .update(User)
      .set({
        email: String(req.body.email),
        firstName: String(req.body.firstName),
        activationEndDate: new Date(req.body.activationEndDate),
        activationStartDate: new Date(String(req.body.activationStartDate)),
        contactNumber: String(req.body.contactNumber),
        lastName: String(req.body.lastName),
        password: String(req.body.password),
        userType: UserType.ADMIN,
        userName: String(req.body.userName),
      })
      .where("id = :idIn", { idIn: Number(req.body.id) })
      .execute();

    res.json(true);
  } catch (error) {
    res.json(false);
  }
};

export const deleteUser = async (req, res) => {
  const idIn = Number(req.body.id);

  try {
    await adminRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :idIn", { idIn: idIn })
      .execute();

    res.json(true);
  } catch (error) {
    res.json(false);
  }
};

export const getUserAll = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const getUserStudentAll = async (req, res) => {
  try {
    /*
    await adminRepository
      .createQueryBuilder("user")
      .where("userType = :userTypeIn", { userTypeIn: UserType.USER })
      .getMany();
      */
    const user = await User.findBy({ userType: UserType.USER });
    res.json(user);
  } catch (error) {
    res.json(false);
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  existUser,
  getUserAll,
  loginAdmin,
  loginUser,
  getUserStudentAll,
};
