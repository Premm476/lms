import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Define the type for a certificate
interface Certificate {
  id: number;
  title: string;
  date: string;
  link: string;
}

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]); // Ensure the state is typed

  useEffect(() => {
    const fetchCertificates = async () => {
      const response = await fetch('/api/student/certificates');
      const data = await response.json();
      setCertificates(data);
    };
    fetchCertificates();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
      <h1 className="text-2xl font-bold">Your Certificates</h1>
      <ul className="mt-4 list-disc pl-5">
        {certificates.map((certificate) => (
          <li key={certificate.id} className="mt-2">
            <p className="font-medium">{certificate.title}</p>
            <p className="text-sm text-gray-500">Issued on: {certificate.date}</p>
            <a href={certificate.link} className="text-indigo-600 hover:underline">View Certificate</a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default CertificatesPage;
