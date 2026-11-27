'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { sanitizeBrandSimInput } from '@/lib/digital-marketing-quiz';

type SimulatorState = {
  brand: string;
  city: string;
  submitted: boolean;
  submitCount: number;
  hasCustomBrand: boolean;
  updateSimulation: (nextBrand: string, nextCity: string) => void;
};

const DEFAULT_BRAND = 'Your Brand';
const DEFAULT_CITY = 'Navi Mumbai';

const DigitalMarketingSimulatorContext = createContext<SimulatorState>({
  brand: DEFAULT_BRAND,
  city: DEFAULT_CITY,
  submitted: false,
  submitCount: 0,
  hasCustomBrand: false,
  updateSimulation: () => {},
});

export function DigitalMarketingSimulatorProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState(DEFAULT_BRAND);
  const [city, setCity] = useState(DEFAULT_CITY);
  const [submitted, setSubmitted] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [hasCustomBrand, setHasCustomBrand] = useState(false);

  const updateSimulation = useCallback((nextBrand: string, nextCity: string) => {
    const safeBrand = sanitizeBrandSimInput(nextBrand, 40, DEFAULT_BRAND);
    const safeCity = sanitizeBrandSimInput(nextCity, 30, DEFAULT_CITY);
    setBrand(safeBrand);
    setCity(safeCity);
    setSubmitted(true);
    setHasCustomBrand(safeBrand !== DEFAULT_BRAND);
    setSubmitCount((c) => c + 1);
  }, []);

  return (
    <DigitalMarketingSimulatorContext.Provider
      value={{ brand, city, submitted, submitCount, hasCustomBrand, updateSimulation }}
    >
      {children}
    </DigitalMarketingSimulatorContext.Provider>
  );
}

export function useDigitalMarketingSimulator() {
  return useContext(DigitalMarketingSimulatorContext);
}
