import { create } from "zustand";

export interface FamilyData {
  name: string;
  abanditswe: number;
  abaje: number;
  abizeKarindwi: number;
  abatangiyeIsabato: number;
  abasuye: number;
  abafashije: number;
  abasuwe: number;
  abafashijwe: number;
  abarwayi: number;
  abasibye: number;
  abafiteImpamvu: number;
  abashyitsi: number;

}

interface AttendanceStore {
  reportDate: string;
  families: FamilyData[];
  isGenerating: boolean;
  setReportDate: (date: string) => void;
  updateFamilyData: (
    familyIndex: number,
    field: keyof FamilyData,
    value: number
  ) => void;
  setIsGenerating: (generating: boolean) => void;
  resetStore: () => void;
  initializeFromStorage: () => void;
  getTransformedData: () => {
    ebenezer: Omit<FamilyData, "name">;
    salvSibs: Omit<FamilyData, "name">;
    jehovahNissi: Omit<FamilyData, "name">;
  };
}

const initialFamilies: FamilyData[] = [
  {
    name: "Ebenezer",
    abaje: 0,
    abizeKarindwi: 0,
    abatangiyeIsabato: 0,
    abasuye: 0,
    abasuwe: 0,
    abafashije: 0,
    abafashijwe: 0,
    abarwayi: 0,
    abasibye: 0,
    abafiteImpamvu: 0,
    abashyitsi: 0,
    abanditswe: 13,
  },
  {
    name: "Salvation Siblings",
    abaje: 0,
    abizeKarindwi: 0,
    abatangiyeIsabato: 0,
    abasuye: 0,
    abasuwe: 0,
    abafashije: 0,
    abafashijwe: 0,
    abarwayi: 0,
    abasibye: 0,
    abafiteImpamvu: 0,
    abashyitsi: 0,
    abanditswe: 13,
  },
  {
    name: "Jehova Nissi",
    abaje: 0,
    abizeKarindwi: 0,
    abatangiyeIsabato: 0,
    abasuye: 0,
    abasuwe: 0,
    abafashije: 0,
    abafashijwe: 0,
    abarwayi: 0,
    abasibye: 0,
    abafiteImpamvu: 0,
    abashyitsi: 0,
    abanditswe: 16,
  },
];

export const useAttendanceStore = create<AttendanceStore>((set, get) => ({
  reportDate: new Date().toISOString().split("T")[0],
  families: initialFamilies,
  isGenerating: false,

  setReportDate: (date) => set({ reportDate: date }),

  updateFamilyData: (familyIndex, field, value) =>
    set((state) => {
      const newFamilies = [...state.families];
      newFamilies[familyIndex] = {
        ...newFamilies[familyIndex],
        [field]: value,
      };
      return { families: newFamilies };
    }),

  setIsGenerating: (generating) => set({ isGenerating: generating }),

  resetStore: () =>
    set({
      reportDate: new Date().toISOString().split("T")[0],
      families: initialFamilies,
      isGenerating: false,
    }),

  initializeFromStorage: () => {
    if (typeof window !== "undefined") {
      const storedDate = sessionStorage.getItem("reportDate");
      if (storedDate) {
        set({ reportDate: storedDate });
      }
    }
  },

  getTransformedData: () => {
    const { families } = get();
    return {
      ebenezer: {
        abanditswe: families[0].abanditswe,
        abaje: families[0].abaje,
        abizeKarindwi: families[0].abizeKarindwi,
        abatangiyeIsabato: families[0].abatangiyeIsabato,
        abasuye: families[0].abasuye,
        abasuwe: families[0].abasuwe,
        abafashijwe: families[0].abafashijwe,
        abafashije: families[0].abafashije,
        abarwayi: families[0].abarwayi,
        abasibye: families[0].abasibye,
        abafiteImpamvu: families[0].abafiteImpamvu,
        abashyitsi: families[0].abashyitsi,
      },
      salvSibs: {
        abanditswe: families[1].abanditswe,
        abaje: families[1].abaje,
        abizeKarindwi: families[1].abizeKarindwi,
        abatangiyeIsabato: families[1].abatangiyeIsabato,
        abasuye: families[1].abasuye,
        abasuwe: families[1].abasuwe,
        abafashijwe: families[1].abafashijwe,
        abafashije: families[1].abafashije,
        abarwayi: families[1].abarwayi,
        abasibye: families[1].abasibye,
        abafiteImpamvu: families[1].abafiteImpamvu,
        abashyitsi: families[1].abashyitsi,
      },
      jehovahNissi: {
        abanditswe: families[2].abanditswe,
        abaje: families[2].abaje,
        abizeKarindwi: families[2].abizeKarindwi,
        abatangiyeIsabato: families[2].abatangiyeIsabato,
        abasuye: families[2].abasuye,
        abasuwe: families[2].abasuwe,
        abafashijwe: families[2].abafashijwe,
        abafashije: families[2].abafashije,
        abarwayi: families[2].abarwayi,
        abasibye: families[2].abasibye,
        abafiteImpamvu: families[2].abafiteImpamvu,
        abashyitsi: families[2].abashyitsi,
      },
    };
  },
}));
