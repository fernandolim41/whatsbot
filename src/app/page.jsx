"use client";
import React, { useState } from 'react';


function MainComponent() {
  const [showModal, setShowModal] = useState(false);
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

  const handleOpenModal = () => {
    setShowModal(true);
    setSuccess(false);
    setError(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
  
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch("/api/createlead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
  
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (err) {
      console.error("Erro no formulário:", err);
      setError(err.message || "Erro ao enviar formulário. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Modal do Formulário */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Comece a automatizar seu WhatsApp
            </h2>

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
            )}
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">WhatsBot</div>
          <button
            onClick={handleOpenModal}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
          >
            Começar Agora
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Automatize seu WhatsApp com IA para Agendamentos
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Aumente sua eficiência com um chatbot inteligente que gerencia
              seus agendamentos 24/7, sem intervenção manual.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleOpenModal}
                className="bg-green-500 text-white px-8 py-3 rounded-full text-lg hover:bg-green-600"
              >
                Teste Grátis
              </button>
              <button
                onClick={handleOpenModal}
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full text-lg hover:bg-blue-50"
              >
                Ver Demo
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <img
              src="https://ucarecdn.com/60e89bc9-0075-4a0e-8892-8411f211483d/-/format/auto/"
              alt="WhatsApp Chatbot Demo em um iPhone"
              className="rounded-lg shadow-xl w-full max-w-md mx-auto"
            />
            <div className="absolute -right-4 top-0 text-6xl">😊</div>
            <div className="absolute -left-4 bottom-0 text-6xl">😊</div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Veja como é fácil automatizar seus agendamentos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <img
                src="https://ucarecdn.com/fb5bb5b8-da06-4f7b-863f-e095063b7f2b/-/format/auto/"
                alt="Agendamento de Pet Shop via WhatsApp"
                className="rounded-lg w-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Pet Shop</h3>
              <p className="text-gray-600">
                Agende banhos e tosas automaticamente pelo WhatsApp
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <img
                src="https://ucarecdn.com/801f1f4e-7033-45cd-9e6c-3c935fca6903/-/format/auto/"
                alt="Agendamento de Tratamento Capilar"
                className="rounded-lg w-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Salão de Beleza</h3>
              <p className="text-gray-600">
                Seus clientes agendam tratamentos com facilidade
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <img
                src="https://ucarecdn.com/3847fb88-83d7-4bd7-91cc-966ea63f15a8/-/format/auto/"
                alt="Interface do WhatsApp Bot"
                className="rounded-lg w-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Qualquer Negócio</h3>
              <p className="text-gray-600">
                Adaptável para diferentes tipos de agendamentos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Integration Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Integração com sua Agenda
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              O WhatsBot sincroniza automaticamente com seu calendário, evitando
              conflitos de horários e organizando seus compromissos de forma
              inteligente.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="text-green-500 text-2xl">✓</span>
                <span className="text-gray-700">Evita duplos agendamentos</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500 text-2xl">✓</span>
                <span className="text-gray-700">Atualização em tempo real</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-500 text-2xl">✓</span>
                <span className="text-gray-700">Lembretes automáticos</span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <img
              src="https://ucarecdn.com/efe0b85e-7c81-4d7f-a050-950732fb28f3/-/format/auto/"
              alt="Calendário integrado"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Benefícios do Nosso Chatbot
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-blue-600 text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-3">Atendimento 24/7</h3>
              <p className="text-gray-600">
                Seu negócio sempre disponível para agendar, mesmo quando você
                não está.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-blue-600 text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-3">
                Agendamento Automático
              </h3>
              <p className="text-gray-600">
                Integração perfeita com sua agenda, evitando conflitos de
                horários.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-blue-600 text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">IA Avançada</h3>
              <p className="text-gray-600">
                Respostas inteligentes e personalizadas para cada cliente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Updated */}
      <div className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Automatize seu WhatsApp hoje mesmo!
          </h2>
          <p className="text-xl mb-8">
            Deixe a IA cuidar dos seus agendamentos enquanto você foca no que
            realmente importa
          </p>
          <button
            onClick={handleOpenModal}
            className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100"
          >
            Começar Gratuitamente
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand Column */}
            <div>
              <h3 className="text-2xl font-bold mb-4">WhatsBot</h3>
              <p className="text-gray-400">
                Soluções em IA para um futuro conectado
              </p>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contato</h3>
              <p className="text-gray-400 mb-2">
                <a
                  href="mailto:artur.ia.chat@gmail.com"
                  className="hover:text-white"
                >
                  artur.ia.chat@gmail.com
                </a>
              </p>
              <p className="text-gray-400">Tel: (11) 97121-0686</p>
            </div>

            {/* Social Media Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Redes Sociais</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.859.07-3.211 0-3.586-.015-4.859-.074-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.859.07-3.211 0-3.586-.015-4.859-.074-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © 2025 <span className="font-bold">WhatsBot</span>. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;