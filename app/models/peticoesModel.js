const client = require("../../config/dbConnection");
const { response } = require("../../config/server");
const { ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken'); //assim é possível gerar e verificar tokens
const SECRET = 'atividadefinal';

module.exports = class PeticoesModel {

    static async getAllPeticoes() {

        console.log(`[Get Peticoes Model]`);
        const cursor = await client.db("peticoes").collection("peticoes").find();
        const peticoes = await cursor.toArray();
        console.log('[Peticoes model]')
        return peticoes;
    }

    static async addPeticao(data) {
        console.log(`[Peticao Model - Add Peticao] ${data}`);
        try {
            const newPeticao = {
                titulo: data.titulo, descricao: data.descricao,
                autor: data.autor, fotoPeticao: data.fotoPeticao, criadoEm: new Date(),
            }
            const addedPeticao = await client.db("peticoes").collection("peticoes").insertOne(newPeticao);
            console.log(`Uma nova petição foi adicionada de ID ${addedPeticao.insertedId}`);
            return addedPeticao;
        } catch (error) {
            console.log(`[peticaoService] Error: ${error}`);
        }
    }

    static async deletePeticao(data) {
        console.log(`[Peticao Model - Delete Peticao] ${data}`);
        const query = { _id: new ObjectId(data) };
        const deletePeticao = await client.db("peticoes").collection("peticoes").deleteOne(query);
        return deletePeticao;
    }

    static async updatePeticao(updateId, data) {
        console.log(`[Peticao Model - Update Peticao] ${data}`);

        const idPeticao = { _id: new ObjectId(updateId) };
        const query = { $set: { titulo: data.titulo, descricao: data.descricao, fotoPeticao: data.fotoPeticao } };
        const updatePeticao = await client.db("peticoes").collection("peticoes").findOne(idPeticao);
        if (updatePeticao == null) return null;
        return await client.db("peticoes").collection("peticoes").updateOne(idPeticao, query);
    }

    static async authUser(data) {
        console.log(`[Peticao Model - authUser] ${data}`);

        try {
            const query = { email: data.email, senha: data.senha };
            const userAuth = await client.db("peticoes").collection("usuarios").findOne(query);
            // se o usuário foi encontrado:
            const token = jwt.sign({ email: userAuth.email }, SECRET, { expiresIn: 1800 });
            return ({ auth: true, token });

        } catch (error) {
            console.log(`[peticaoService] Error: ${error}`);

        }

    }

    static async signPeticao(signId, signEmail) {
        try {
            const idPeticao = { _id: new ObjectId(signId) };
            const query = { $push: { assinatura: signEmail } };
            return await client.db("peticoes").collection("peticoes").updateOne(idPeticao, query);
        } catch (error) {
            console.log(`[signPeticao] Error: ${error}`);
        }
    }

    static async addTopic(topicId, topic) {
        try {
            const idPeticao = { _id: new ObjectId(topicId) };
            const query = { $push: { comentarios: topic } };
            return await client.db("peticoes").collection("peticoes").updateOne(idPeticao, query);
        } catch (error) {
            console.log(`[addTopic] Error: ${error}`);
        }
    }
}