import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Header, SiteFooter } from '../components/UI';
import { getPengajuanList } from '../services/api';
import type { PengajuanItem } from '../types';

const PengajuanSaya: React.FC = () => {
  const [items, setItems] = useState<PengajuanItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPengajuanList();
        setItems(data);
      } catch (err: any) {
        setError(err?.message || 'Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  const statusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
      case 'in_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
      case 'selesai':
        return 'bg-green-100 text-green-800';
      case 'rejected':
      case 'ditolak':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-6">Pengajuan Saya</h1>

          {loading && <p>Memuat data pengajuan...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <p>Tidak ada pengajuan yang ditemukan.</p>
          )}

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.referenceNumber || item.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.ownerName || ''} {item.role ? `- ${item.role}` : ''}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses(
                    item.status,
                  )}`}
                >
                  {item.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default PengajuanSaya;
