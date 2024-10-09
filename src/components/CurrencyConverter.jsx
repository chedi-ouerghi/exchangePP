import React, { useState, useEffect, useCallback } from 'react';
import './CurrencyConverter.css';
import CurrencyChart from './CurrencyChart';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '';
    // a4492fc33e5529c62a94477a
    
  const currencies = [
    'USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
    'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'INR', 'RUB', 'BRL', 'ZAR',
    'TND', 'MAD'
  ];

  const emojiFlags = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    JPY: '🇯🇵',
    GBP: '🇬🇧',
    AUD: '🇦🇺',
    CAD: '🇨🇦',
    CHF: '🇨🇭',
    CNY: '🇨🇳',
    SEK: '🇸🇪',
    NZD: '🇳🇿',
    MXN: '🇲🇽',
    SGD: '🇸🇬',
    HKD: '🇭🇰',
    NOK: '🇳🇴',
    KRW: '🇰🇷',
    TRY: '🇹🇷',
    INR: '🇮🇳',
    RUB: '🇷🇺',
    BRL: '🇧🇷',
    ZAR: '🇿🇦',
    TND: '🇹🇳',
    MAD: '🇲🇦'
  };

const handleConvert = useCallback(async () => {
  setLoading(true); // Indicateur de chargement actif
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des données');

    const data = await response.json();
    const rate = data.conversion_rate;
    if (rate) {
      const result = (amount * rate).toFixed(2);
      setConvertedAmount(result);
      setMessage(`Conversion réussie de ${amount} ${fromCurrency} en ${result} ${toCurrency}`);

      // Réinitialiser le montant et masquer l'alerte après 20 secondes
      setTimeout(() => {
        setAmount(1);
        setConvertedAmount(null);
        setMessage('');
      }, 20000);
    } else throw new Error('Taux de conversion non disponible');
  } catch (error) {
    console.error('Erreur lors de la conversion', error);
    setMessage('Erreur lors de la conversion, veuillez réessayer.');
  } finally {
    setLoading(false); // Désactiver l'indicateur de chargement
  }
}, [amount, fromCurrency, toCurrency, apiKey]);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      handleConvert();
    }
  }, [amount, fromCurrency, toCurrency, handleConvert]);

  return (
    <div className="PageConversion">
      {/* Cercles en arrière-plan générés dynamiquement */}
      {["Ellipse2", "Ellipse4", "Ellipse7"].map((className, index) => (
        <div key={index} className={className} />
      ))}

      {/* Conteneur central */}
      <div className="ContainerBoxCenter">
        {/* Titre général de la page */}
        <div className="Conversions">Conversions</div>

        {/* Boîte de gauche : Entrée du montant et sélection de la devise source */}
        <div className="BoxLeft">
          <label htmlFor="amountInput" className="visually-hidden">
            Montant en {fromCurrency}
          </label>
          <input
            id="amountInput"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Montant en ${fromCurrency}`}
            aria-label={`Entrer le montant en ${fromCurrency}`}
          />
          <label htmlFor="fromCurrencySelect" className="visually-hidden">
            Devise source
          </label>
          <select
            id="fromCurrencySelect"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            aria-label="Sélectionner la devise source"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {emojiFlags[currency]} {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Boîte de droite : Sélection de la devise cible */}
        <div className="BoxRight">
          <label htmlFor="toCurrencySelect" className="visually-hidden">
            Devise cible
          </label>
          <select
            id="toCurrencySelect"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            aria-label="Sélectionner la devise cible"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {emojiFlags[currency]} {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Flèche visuelle entre les boîtes */}
        <img width="64" height="64" src="https://img.icons8.com/dusk/64/arrow.png" alt="arrow" className="IconArrow1" />

        {/* Affichage du montant converti */}
        <input
          type="text"
          value={convertedAmount || ""}
          readOnly
          placeholder={`Montant en ${toCurrency}`}
          aria-label={`Montant converti en ${toCurrency}`}
          className="Resultat"
        />
      </div>
      
      {/* Nouveau conteneur pour les messages */}
      <div className="MessageContainer">
        {/* Message d'erreur ou d'information */}
        <div className="Message">{message}</div>
        {/* Affichage du chargement */}
        {loading && <div className="Loading">Chargement...</div>}
          </div>
          
          <CurrencyChart/>
          
    </div>
  );
};

export default CurrencyConverter;
