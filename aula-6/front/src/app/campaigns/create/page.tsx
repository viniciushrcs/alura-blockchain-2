'use client';

import { useState } from 'react';

export default function CreateCampaignPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleCreate = async () => {
    console.log({ title, description, goal, deadline });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Criar Nova Campanha</h1>
        <p className="text-gray-600 text-center mt-2 mb-6">
          Insira as informações da campanha para arrecadação
        </p>
        <form>
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da campanha"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              id="description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Descreva sua campanha"
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
              Meta (ETH)
            </label>
            <input
              type="number"
              id="goal"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Digite a meta de arrecadação"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
              Prazo
            </label>
            <input
              type="date"
              id="deadline"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleCreate}
          >
            Criar Campanha
          </button>
        </form>
      </div>
    </div>
  );
}