"use client";
import React from "react";

function MainComponent() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    estabelecimento: "",
    cidade: "",
    estado: "",
    bairro: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/createlead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      setSuccess(true);
      setFormData({
        nome: "",
        telefone: "",
        estabelecimento: "",
        cidade: "",
        estado: "",
        bairro: "",
      });
      e.target.reset();
    } catch (err) {
      console.error("Erro no formulário:", err);
      setError(
        err.message || "Erro ao enviar formulário. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-md w-full">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">WhatsBot</div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          {success ? (
            <div className="text-center py-8">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Cadastro realizado com sucesso!
              </h3>
              <p className="text-gray-600">
                Em breve entraremos em contato com você.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Comece a automatizar seu WhatsApp
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="nome" className="block text-gray-700 mb-1">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      fieldErrors.nome ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-gray-700 mb-1"
                  >
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      fieldErrors.telefone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="estabelecimento"
                    className="block text-gray-700 mb-1"
                  >
                    Tipo de estabelecimento
                  </label>
                  <select
                    id="estabelecimento"
                    name="estabelecimento"
                    value={formData.estabelecimento}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      fieldErrors.estabelecimento
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    required
                    disabled={loading}
                  >
                    <option value="">Selecione...</option>
                    <option value="pet-shop">Pet Shop</option>
                    <option value="salao">Salão de Beleza</option>
                    <option value="clinica">Clínica</option>
                    <option value="consultorio">Consultório</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="estado" className="block text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      fieldErrors.estado ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                    disabled={loading}
                  >
                    <option value="">Selecione...</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="PR">Paraná</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="GO">Goiás</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="BA">Bahia</option>
                    <option value="SE">Sergipe</option>
                    <option value="AL">Alagoas</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PB">Paraíba</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="CE">Ceará</option>
                    <option value="PI">Piauí</option>
                    <option value="MA">Maranhão</option>
                    <option value="PA">Pará</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="RR">Roraima</option>
                    <option value="AC">Acre</option>
                    <option value="RO">Rondônia</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cidade" className="block text-gray-700 mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      fieldErrors.cidade ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="bairro" className="block text-gray-700 mb-1">
                    Bairro
                  </label>
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      fieldErrors.bairro ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {loading ? "Enviando..." : "Enviar"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 WhatsBot. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;