
import api from "./api";

async function getAll() {
  return await api.get(`/articles`);
}

async function getById(id) {
  return await api.get(`/articles/${id}`);
}

async function create(data) {
  return await api.post(`/articles`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

async function update(id, data) {
  return await api.put(`/articles/${id}`, data);
}

async function deleteArticle(id) {
  return await api.delete(`/articles/${id}`);
}

export const Article = {
  getAll,
  getById,
  create,
  update,
  delete: deleteArticle,
};