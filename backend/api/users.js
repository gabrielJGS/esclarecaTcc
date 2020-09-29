const bcrypt = require("bcrypt-nodejs");
const Users = require("../models/Users");
const { hostIp } = require("../.env");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const aws = require("aws-sdk");
const {
  storageOption,
  s3Config_bucket,
  s3Config_accessKeyId,
  s3Config_secretAccessKey,
  userMail,
  passMail,
} = require("../.env");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userMail,
    pass: passMail,
  },
});

module.exports = (app) => {
  const obterHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => callback(hash));
    });
  };
  const save = async (req, res) => {
    const email = req.body.email.trim().toLowerCase();
    const tags = req.body.tags.trim().toLowerCase();
    console.log(req.body.avatarUser);
    let { key = "", location: url = "" } = "";

    if (req.file) {
      key = req.file.key;
      url = req.file.location;
    }

    if (req.body.avatarUser) {
      url = req.body.avatarUser;
    }

    const userExist = await Users.findOne({ email });
    if (userExist) {
      res.status(400).json(`${email} já foi cadastrado\nEsqueceu sua senha?`);
    } else {
      obterHash(req.body.password.trim().toLowerCase(), (hash) => {
        const user = Users.create({
          name: req.body.name,
          email,
          password: hash,
          tags: tags.split(",").map((tag) => tag.trim()),
          key,
          url,
          ranking: 0,
          blocked: [],
          followed: [],
        })
          .then((u) => res.status(204).send(u))
          .catch((err) => res.status(400).json(err));
      });
    }
  };
  const update = (req, res) => {
    const { id } = req.params;
    let { key = "", location: url = "" } = "";
    if (req.file) {
      key = req.file.key;
      url = req.file.location;
      if (url == null) {
        url = `http:${hostIp}:3333/files/${key}`;
      }
      user = Users.findByIdAndUpdate(id, { key, url })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(400).json(err));
    } else {
      const email = req.body.email.trim().toLowerCase();
      const tags = req.body.tags.trim().toLowerCase();
      obterHash(req.body.password.trim().toLowerCase(), (hash) => {
        const password = hash;

        user = Users.findByIdAndUpdate(id, {
          name: req.body.name,
          email,
          password: hash,
          tags: tags.split(",").map((tag) => tag.trim()),
        })
          .then((_) => res.status(204).send())
          .catch((err) => res.status(500).json(err));
      });
    }
  };

  const upload = async (req, res) => {
    const { id } = req.params;
    let { key = "", location: url = "" } = "";

    if (req.file) {
      let user;

      try {
        user = Users.findById(id).then((u) => {
            var s3 = new aws.S3({
                accessKeyId: s3Config_accessKeyId,
                secretAccessKey: s3Config_secretAccessKey,
              });
              var params = { Bucket: s3Config_bucket, Key: u.key };
              s3.deleteObject(params, function (err, data) {
                if (err) console.log(err, err.stack);
                // error
                else console.log(); // deleted
              });       
              key = req.file.key;
              url = req.file.location;
              if (url == null) {
                url = `http:${hostIp}:3333/files/${key}`;
              }
              u.key = key;
              u.url = url;
              u.save().catch((err) => res.status(400).json(err));
            });

      } catch (e) {
        console.log(e); // deleted
      }
      return res.status(201).send();
   
    } else {
      return res.status(204).send("Nenhum arquivo enviado");
    }
  };
  
  const patch = (req, res) => {
    const { id } = req.params;
    const tags = req.body.tags.trim().toLowerCase();

    user = Users.findByIdAndUpdate(id, {
      tags: tags.split(",").map((tag) => tag.trim()),
    })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(400).json(err));
  };
  const profile = async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.headers;

    const userLogged = await Users.findById(user_id).catch((err) =>
      res.status(400).json(err)
    );
    if (!userLogged) {
      return res.status(401).send("Usuário logado inválido");
    }

    const user = await Users.findById(id).catch((err) =>
      res.status(400).json(err)
    );
    let response = { user, isBlocked: false, isFollowed: false };
    if (userLogged.blocked.find((u) => u == id)) {
      //Usuário está bloqueado pelo usuário logado
      response.isBlocked = true;
    }
    if (userLogged.followed.find((u) => u == id)) {
      //Usuário está sendo seguido pelo usuário logado
      response.isFollowed = true;
    }
    res.json(response);
  };

  const list = async (req, res) => {
    const top = await Users.find()
      .sort({ ranking: -1 })
      .limit(10)
      .catch((err) => res.status(400).json(err));
    res.json(top);
  };

  const index = async (req, res) => {
    const { search_text } = req.headers;
    //Páginação
    const qtdLoad = 10;
    const { page = 1 } = req.query;

    const count = await Users.find({
      name: { $regex: `${search_text}`, $options: "i" },
    }).countDocuments();

    res.header("X-Total-Count", count);

    const users = await Users.find({
      name: { $regex: `${search_text}`, $options: "i" },
    })
      .sort({ ranking: -1 })
      .skip((page - 1) * qtdLoad)
      .limit(qtdLoad)
      .catch((err) => res.status(400).json(err));
    res.json(users);
  };

  const blockUser = async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.headers;

    if (id == user_id) {
      return res.status(400).send("Não é possível bloquear você mesmo");
    }

    const userToBlock = await Users.findById(id).catch((err) =>
      res.status(400).json(err)
    );
    if (!userToBlock) {
      return res.status(401).send("Usuário a bloquear inválido");
    }
    const userLogged = await Users.findById(user_id).catch((err) =>
      res.status(400).json(err)
    );
    if (!userLogged) {
      return res.status(401).send("Usuário logado é inválido");
    }

    if (userLogged.blocked.find((u) => u == id)) {
      //Desbloqueando
      const index = userLogged.blocked.indexOf(id);
      if (index > -1) {
        userLogged.blocked.splice(index, 1);
      }
      await userLogged.save().catch((err) => res.status(400).json(err));
      res.status(201).send();
    } else {
      //Bloqueando
      if (userLogged.followed.find((u) => u == id)) {
        //Deixando de seguir
        const index = userLogged.followed.indexOf(id);
        if (index > -1) {
          userLogged.followed.splice(index, 1);
        }
        await userLogged.save().catch((err) => res.status(400).json(err));
      }

      userLogged.blocked.push(id);
      await userLogged.save().catch((err) => res.status(400).json(err));

      res.status(204).send();
    }
  };

  const followUser = async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.headers;

    if (id == user_id) {
      return res.status(400).send("Não é possível seguir você mesmo");
    }

    const userToBlock = await Users.findById(id).catch((err) =>
      res.status(400).json(err)
    );
    if (!userToBlock) {
      return res.status(401).send("Usuário a seguir inválido");
    }
    const userLogged = await Users.findById(user_id).catch((err) =>
      res.status(400).json(err)
    );
    if (!userLogged) {
      return res.status(401).send("Usuário logado é inválido");
    }

    if (userLogged.followed.find((u) => u == id)) {
      //Deixando de seguir
      const index = userLogged.followed.indexOf(id);
      if (index > -1) {
        userLogged.followed.splice(index, 1);
      }
      await userLogged.save().catch((err) => res.status(400).json(err));
      res.status(201).send();
    } else {
      //Seguindo
      userLogged.followed.push(id);
      await userLogged.save().catch((err) => res.status(400).json(err));

      res.status(204).send();
    }
  };

  const forgotPassword = async (req, res) => {
    const email = req.body.email.trim().toLowerCase();
    crypto.randomBytes(3, async (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const token = buffer.toString("hex");
      const userExist = await Users.findOne({ email });
      if (!userExist) {
        return res.status(400).json(`${email} inexistente!`);
      } else {
        obterHash(token.trim().toLowerCase(), (hash) => {
          userExist.password = hash;
          userExist.save().then((savedUser) => {
            transporter.sendMail({
              to: email,
              from: userMail,
              subject: "Esqueceu a senha",
              html: `
                                <p>Olá ${userExist.name}, você esqueceu sua senha?</p>
                                <h5>Esta é o seu código: ${token}</h5>
                                <p>Volte para o aplicativo e insira-o no campo destinada para prosseguir! :)</p>
                            `,
            });
            res.status(200).json({
              message: "Verifique seu e-mail e faça o login com a sua senha!",
            });
          });
        });
      }
    });
  };

  const resetPassword = async (req, res) => {
    const email = req.body.email.trim().toLowerCase();
    const hash = req.body.hash.trim().toLowerCase();
    const newPass = req.body.newPass.trim().toLowerCase();

    const userExist = await Users.findOne({ email });
    if (!userExist) {
      return res.status(400).json(`${email} inexistente!`);
    } else {
      bcrypt.compare(hash, userExist.password, (err, isMatch) => {
        if (err || !isMatch) {
          res.status(401).send("Código informálido inválido ou expirado.");
          return;
        }
        obterHash(newPass, (cod) => {
          userExist.password = cod;
          userExist.save().then((savedUser) => {
            res.status(200).json({ message: "Senha alterada com sucesso!" });
          });
        });
      });
    }
  };

  const pushTokenPass = async (req, res) => {
    const token = req.body.token;
    const userExist = req.body.user;
    user = Users.findByIdAndUpdate(userExist, {
      pushToken: token,
    })
      .then((_) => res.status(204).send())
      .catch((err) => res.status(500).json(err));
  };

  return {
    save,
    update,
    patch,
    profile,
    upload,
    list,
    blockUser,
    followUser,
    index,
    forgotPassword,
    resetPassword,
    pushTokenPass,
  };
};
