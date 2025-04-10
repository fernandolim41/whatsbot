"use client";
import React from "react";

function MainComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setError("");

    if (password === "98766789") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Senha incorreta");
    }
    setLoginLoading(false);
  };

  const fetchLeads = useCallback(async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await fetch("/api/getleads");
      if (!response.ok) {
        throw new Error("Erro ao carregar leads");
      }
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar leads");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const response = await fetch("/api/updateleadstatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leadId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar status");
      }

      await fetchLeads();
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar status");
    }
  };

  const filteredLeads = leads.filter((lead) =>
    statusFilter === "todos" ? true : lead.status === statusFilter
  );

  const formatarDataBR = (data) => {
    const dataObj = new Date(data);
    // Ajusta para timezone de São Paulo (UTC-3)
    const dataSP = new Date(dataObj.getTime() - 3 * 60 * 60 * 1000);
    return dataSP.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Painel Administrativo
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className={`w-full py-3 rounded-lg font-semibold ${
                loginLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loginLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">WhatsBot Admin</div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            Sair
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="todos">Todos</option>
              <option value="novo">Novo</option>
              <option value="contatado">Contatado</option>
              <option value="qualificado">Qualificado</option>
              <option value="fechado">Fechado</option>
              <option value="perdido">Perdido</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8 text-gray-600">Carregando...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-gray-600">Data</th>
                    <th className="px-4 py-2 text-left text-gray-600">Nome</th>
                    <th className="px-4 py-2 text-left text-gray-600">
                      Telefone
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600">
                      Estabelecimento
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600">
                      Cidade/Estado
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-t border-gray-100">
                      <td className="px-4 py-2 text-gray-800">
                        {formatarDataBR(lead.data_cadastro)}
                      </td>
                      <td className="px-4 py-2 text-gray-800">{lead.nome}</td>
                      <td className="px-4 py-2 text-gray-800">
                        {lead.telefone}
                      </td>
                      <td className="px-4 py-2 text-gray-800">
                        {lead.estabelecimento}
                      </td>
                      <td className="px-4 py-2 text-gray-800">
                        {lead.cidade}/{lead.estado}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            lead.status === "novo"
                              ? "bg-blue-100 text-blue-800"
                              : lead.status === "contatado"
                              ? "bg-yellow-100 text-yellow-800"
                              : lead.status === "qualificado"
                              ? "bg-green-100 text-green-800"
                              : lead.status === "fechado"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {lead.status.charAt(0).toUpperCase() +
                            lead.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateLeadStatus(lead.id, e.target.value)
                          }
                          className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="novo">Novo</option>
                          <option value="contatado">Contatado</option>
                          <option value="qualificado">Qualificado</option>
                          <option value="fechado">Fechado</option>
                          <option value="perdido">Perdido</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredLeads.length === 0 && (
                <div className="text-center py-8 text-gray-600">
                  Nenhum lead encontrado
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;