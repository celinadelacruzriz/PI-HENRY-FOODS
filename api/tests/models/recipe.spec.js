const { Recipe, conn } = require("../../src/db.js");


describe("Recipe model: ", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("No se pudo conectar a la database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: false }));
    describe("Title", () => {
      it("Debe arrojar error si el title es null", (done) => {
        Recipe.create({
          summary: "masa de harina finita, con relleno de pasta de pollo y condimentos",
        })
          .then(() => done(new Error("Requiere un title valido")))
          .catch(() => done());
      });
      it("Debe arrojar error si summary es null", () => {
        Recipe.create({ title: "Ravioles de pollo" })
          .then(() => done(new Error("Necesita un resumen")))
          .catch(() => done());
      });
    });
    describe("Health Score", () => {
      it("Shouldn't work with a string in healthScore", (done) => {
        Recipe.create({
          title: "Ravioles de pollo",
          summary: "masa de harina finita, con relleno de pasta de pollo y condimentos",
          healthScore: "This is invalid data",
        })
          .then(() => done("Should not be created"))
          .catch(() => done());
      });
    });
    describe("Aggregate Likes", () => {
      it("Debe arrojar error si recibe un string en aggregateLikes", (done) => {
        Recipe.create({
          title: "Ravioles de pollo",
          summary: "masa de harina finita, con relleno de pasta de pollo y condimentos",
          aggregateLikes: "No es un dato valido",
        })
          .then(() => done("No deberia crearse"))
          .catch(() => done());
      });
    });
  });
});
