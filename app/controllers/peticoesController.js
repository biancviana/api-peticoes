const Joi = require('joi');
const Peticao = require("../models/peticoesModel");
const jwt = require('jsonwebtoken'); //assim é possível gerar e verificar tokens
const SECRET = 'atividadefinal';

const schema = Joi.object().keys({
   titulo: Joi.string().required().min(1).max(100),
   descricao: Joi.string().required().min(1).max(600),
   autor: Joi.string().required().min(1).max(100),
   fotoPeticao: Joi.string().required().min(1).max(1000),
});

const schemaUsuarios = Joi.object().keys({
   email: Joi.string().required().min(1).max(100),
   senha: Joi.string().required().min(1).max(100),
});

module.exports = class Peticoes {

   static async apiGetAllPeticoes(req, res, next) {
      console.log('Controller Peticoes - get peticoes');
      try {
         const peticoes = await Peticao.getAllPeticoes();
         if (!peticoes) {
            res.status(404).json(`Não existe petição cadastrada.`);
            return;
         }
         res.status(200).json(peticoes);

      } catch (error) {
         console.log(`[getallpeticoes error] ${error}`);
         res.status(500).json({ error: error });
         return;
      }
   }

   static async addPeticao(req, res, next) {
      console.log('[Add Peticao Controller]', req.body);

      const token = req.headers['x-access-token'];

      jwt.verify(token, SECRET, (error, decoded) => {
         if (error) {
            res.status(401).json({ error: error });
            return;
         }

         req.email = decoded.email;
      });

      const { error, value } = schema.validate(req.body);
      if (error) {
         const result = {
            msg: 'Não foi possível adicionar uma petição. Corrija os campos!',
            error: error.details
         }
         res.status(404).json(result);
         return;
      }
      try {
         if (req.email != null) {
            const addedPeticao = await Peticao.addPeticao(req.body);
            res.status(200).json(addedPeticao);
         }
      } catch (error) {
         res.status(500).json({ error: error });
      }
   }

   static async deletePeticao(req, res, next) {
      console.log(req.params.id);

      const token = req.headers['x-access-token'];

      jwt.verify(token, SECRET, (error, decoded) => {
         if (error) {
            res.status(401).json({ error: error });
            return;
         }

         req.email = decoded.email;
      });

      try {
         if (req.email != null) {
            const data = await Peticao.deletePeticao(req.params.id);
            if (!data) return res.status(404).json({ error: 'Não foi possível encontrar a petição!' });
            res.status(200).json(data);
         }
      } catch (error) {
         res.status(500).json({ error: error });
      }

   }

   static async updatePeticao(req, res, next) {
      console.log(req.params.id);

      const token = req.headers['x-access-token'];

      jwt.verify(token, SECRET, (error, decoded) => {
         if (error) {
            res.status(401).json({ error: error });
            return;
         }

         req.email = decoded.email;
      });

      try {
         if (req.email != null) {
            const data = await Peticao.updatePeticao(req.params.id, req.body);
            if (!data) return res.status(404).json({ error: 'Não foi possível encontrar a petição!' });
            res.status(200).json(data);
         }
      } catch (error) {
         res.status(500).json({ error: error });
      }

   }

   static async authUser(req, res, next) {
      console.log('[Auth User Controller]', req.body);

      const { error, value } = schemaUsuarios.validate(req.body);
      if (error) {
         const result = {
            msg: 'Não foi possível autenticar o usuário. Corrija os campos!',
            error: error.details
         }
         res.status(404).json(result);
         return;
      }
      try {
         const addedUser = await Peticao.authUser(req.body);
         res.status(200).json(addedUser);
      } catch (error) {
         res.status(500).json({ error: error });
      }
   }

   static async signPeticao(req, res, next) {
      console.log('[Sign Peticao Controller]', req.body);

      const token = req.headers['x-access-token'];

      jwt.verify(token, SECRET, (error, decoded) => {
         if (error) {
            res.status(401).json({ error: error });
            return;
         }

         req.email = decoded.email;
      });

      try {
         if (req.email != null) {
            const data = await Peticao.signPeticao(req.params.id, req.email);
            if (!data) return res.status(404).json({ error: 'Não foi possível encontrar a petição!' });
            res.status(200).json(data);
         }
      } catch (error) {
         res.status(500).json({ error: error });
      }
   }

   static async addTopic(req, res, next) {
      console.log('[Add Topic Controller]', req.body);

      try {
         const data = await Peticao.addTopic(req.params.id, req.body);
         if (!data) return res.status(404).json({ error: 'Não foi possível encontrar a petição!' });
         res.status(200).json(data);
      } catch (error) {
         res.status(500).json({ error: error });
      }

   }
}