const { Diet, conn } = require("../../src/db.js");


describe("Diet model: ", () => {
      before(() =>
            conn.authenticate().catch((err) => {
                  console.error("No se pudo conectar a la database:", err);
            })
      );
      describe("Validators", () => {
            beforeEach(() => Diet.sync({ force: false }));
            describe("Name", () => {
                  it("Debe arrojar error si el name es null", (done) => {
                        Diet.create({
                              summary: "masa de harina finita, con relleno de pasta de pollo y condimentos",
                        })
                              .then(() => done(new Error("Requiere un title valido")))
                              .catch(() => done());
                  });

            })
      })
})
