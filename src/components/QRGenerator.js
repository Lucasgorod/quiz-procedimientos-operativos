import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode } from 'lucide-react';

const QRGenerator = ({ quizId, sessionCode }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const generateQR = async () => {
      const url = `${window.location.origin}/quiz/${quizId}?session=${sessionCode}`;
      try {
        const qrUrl = await QRCode.toDataURL(url, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error('Error generating QR:', error);
      }
    };

    if (sessionCode) {
      generateQR();
    }
  }, [quizId, sessionCode]);

  return (
    <div className="bg-gray-800 rounded-2xl p-8 mx-auto max-w-sm">
      {qrCodeUrl ? (
        <img src={qrCodeUrl} alt="QR Code" className="w-full" />
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <QrCode className="w-48 h-48 text-gray-600" />
          <p className="text-sm text-gray-500 mt-4">
            Generando código QR...
          </p>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;
