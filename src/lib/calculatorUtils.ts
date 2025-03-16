
// This file contains the logic for calculating carbon footprint
// Based on user inputs for transportation, energy usage, diet, etc.

export interface FootprintValues {
  transportation: string;
  transportationkilometers: number;
  homeEnergy: string;
  homeSize: number;
  dietType: string;
  wasteRecycling: string;
  flightsPerYear: number;
}

export interface FootprintResults {
  transportationEmissions: number;
  homeEmissions: number;
  foodEmissions: number;
  wasteEmissions: number;
  flightEmissions: number;
  totalEmissions: number;
}

// Default values for footprint calculator
export const defaultFootprintValues: FootprintValues = {
  transportation: "car-gasoline",
  transportationkilometers: 10000,
  homeEnergy: "electricity",
  homeSize: 1500,
  dietType: "omnivore",
  wasteRecycling: "some",
  flightsPerYear: 2
};

// Carbon emission factors (kg CO2 per unit)
const emissionFactors = {
  transportation: {
    "car-gasoline": 0.404, // kg CO2 per mile
    "car-electric": 0.1, // kg CO2 per mile
    "public-transit": 0.14, // kg CO2 per mile
    "walk-bike": 0, // kg CO2 per mile
  },
  homeEnergy: {
    "electricity": 0.92, // kg CO2 per sq ft per year
    "natural-gas": 0.65, // kg CO2 per sq ft per year
    "renewable": 0.2, // kg CO2 per sq ft per year
  },
  dietType: {
    "vegan": 1.5, // tonnes CO2 per year
    "vegetarian": 1.7, // tonnes CO2 per year
    "pescatarian": 1.9, // tonnes CO2 per year
    "omnivore": 2.5, // tonnes CO2 per year
  },
  wasteRecycling: {
    "extensive": 0.1, // tonnes CO2 per year
    "some": 0.3, // tonnes CO2 per year
    "minimal": 0.5, // tonnes CO2 per year
  },
  flights: 0.2, // tonnes CO2 per flight
};

export const calculateFootprint = (values: FootprintValues): FootprintResults => {
  // Calculate transportation emissions
  const transportationEmissions = 
    values.transportationkilometers * 
    emissionFactors.transportation[values.transportation as keyof typeof emissionFactors.transportation];
  
  // Calculate home energy emissions
  const homeEmissions = 
    values.homeSize * 
    emissionFactors.homeEnergy[values.homeEnergy as keyof typeof emissionFactors.homeEnergy];
  
  // Get food emissions based on diet type
  const foodEmissions = 
    emissionFactors.dietType[values.dietType as keyof typeof emissionFactors.dietType] * 1000; // Convert tonnes to kg
  
  // Get waste emissions based on recycling habits
  const wasteEmissions = 
    emissionFactors.wasteRecycling[values.wasteRecycling as keyof typeof emissionFactors.wasteRecycling] * 1000; // Convert tonnes to kg
  
  // Calculate flight emissions
  const flightEmissions = values.flightsPerYear * emissionFactors.flights * 1000; // Convert tonnes to kg
  
  // Calculate total emissions (in kg CO2)
  const totalEmissions = 
    transportationEmissions + 
    homeEmissions + 
    foodEmissions + 
    wasteEmissions + 
    flightEmissions;
  
  return {
    transportationEmissions,
    homeEmissions,
    foodEmissions,
    wasteEmissions,
    flightEmissions,
    totalEmissions
  };
};

// Helper function to get personalized carbon reduction tips
export const getReductionTips = (results: FootprintResults): string[] => {
  const tips: string[] = [];
  
  if (results.transportationEmissions > 1000) {
    tips.push("Consider carpooling, using public transportation, or switching to an electric vehicle.");
  }
  
  if (results.homeEmissions > 1000) {
    tips.push("Install energy-efficient appliances and LED lighting to reduce your home energy usage.");
  }
  
  if (results.foodEmissions > 1500) {
    tips.push("Try having more plant-based meals during the week to reduce emissions from your diet.");
  }
  
  if (results.wasteEmissions > 200) {
    tips.push("Increase your recycling efforts and consider composting food waste.");
  }
  
  if (results.flightEmissions > 500) {
    tips.push("Consider alternatives to flying or purchase carbon offsets for necessary flights.");
  }
  
  // Add general tips if specific ones are low
  if (tips.length < 3) {
    tips.push("Use reusable bags, bottles, and containers to reduce single-use plastic waste.");
    tips.push("Support local and sustainable businesses in your community.");
  }
  
  return tips;
};

// Adding the functions needed by Calculator.tsx

// Function to calculate total emissions from form data
export const calculateTotalEmissions = (formData: any): number => {
  // Calculate emissions based on transportation
  const transportationEmission = calculateTransportationEmissions(formData.transportation);
  
  // Calculate emissions based on energy usage
  const energyEmission = calculateEnergyEmissions(formData.energy);
  
  // Calculate emissions based on food consumption
  const foodEmission = calculateFoodEmissions(formData.food);
  
  // Calculate emissions based on waste
  const wasteEmission = calculateWasteEmissions(formData.waste);
  
  // Sum up all emissions
  const totalEmission = transportationEmission + energyEmission + foodEmission + wasteEmission;
  
  return totalEmission;
};

// Helper functions for each emission category
const calculateTransportationEmissions = (transportation: any): number => {
  let emission = 0;
  const { type, distance, isCar } = transportation;
  
  if (type === "car") {
    if (isCar) {
      // Different car types have different emission factors
      const carEmissionFactor = type === "electric" ? 0.1 : 0.4;
      emission = distance * 52 * carEmissionFactor; // weekly to yearly
    }
  } else if (type === "bus") {
    emission = distance * 52 * 0.14;
  } else if (type === "train") {
    emission = distance * 52 * 0.08;
  } else if (type === "plane") {
    emission = distance * 52 * 0.25;
  } else if (type === "bike") {
    emission = 0; // Zero emissions for biking
  }
  
  return emission;
};

const calculateEnergyEmissions = (energy: any): number => {
  const { electricity, naturalGas, heating } = energy;
  
  // Calculate electricity emissions (kWh to kg CO2)
  const electricityEmission = electricity * 12 * 0.4; // monthly to yearly
  
  // Calculate natural gas emissions (therms to kg CO2)
  const naturalGasEmission = naturalGas * 12 * 5.3; // monthly to yearly
  
  // Calculate heating emissions if applicable
  let heatingEmission = 0;
  if (heating) {
    const { type, amount } = heating;
    const heatingFactor = type === "oil" ? 10.4 : 6.2; // oil vs propane
    heatingEmission = amount * 12 * heatingFactor; // monthly to yearly
  }
  
  return electricityEmission + naturalGasEmission + heatingEmission;
};

const calculateFoodEmissions = (food: any): number => {
  let emission = 0;
  
  // Different food types have different emission factors (kg CO2 per kg food)
  const emissionFactors = {
    RedMeat: 60,
    Legumes: 7,
    poultry: 6,
    fish: 5,
    dairy: 6,
    eggs: 4.5,
    grains: 1.5,
    vegetables: 2,
    fruits: 1.5,
    processed: 5
  };
  
  // Calculate emissions for each food type
  for (const [foodType, amount] of Object.entries(food)) {
    emission += (amount as number) * 52 * (emissionFactors as any)[foodType]; // weekly to yearly
  }
  
  return emission;
};

const calculateWasteEmissions = (waste: any): number => {
  const { landfill, recycled, composted } = waste;
  
  // Different waste handling has different emission factors
  const landfillEmission = landfill * 52 * 3; // weekly to yearly
  const recycledEmission = recycled * 52 * 0.5; // weekly to yearly
  const compostedEmission = composted * 52 * 0.1; // weekly to yearly
  
  return landfillEmission + recycledEmission + compostedEmission;
};

// Function to get personalized reduction suggestions
export const getReductionSuggestions = (formData: any, totalEmissions: number): any[] => {
  const suggestions = [];
  
  // Transportation suggestions
  if (formData.transportation.type === "car" && !formData.transportation.isCar) {
    suggestions.push({
      category: "Transportation",
      suggestions: [
        "Switch to an electric or hybrid vehicle to reduce emissions",
        "Consider carpooling or using public transportation when possible",
        "Combine errands to reduce the number of trips"
      ]
    });
  } else if (formData.transportation.distance > 100) {
    suggestions.push({
      category: "Transportation",
      suggestions: [
        "Consider working from home a few days a week if possible",
        "Look for closer options for regular activities",
        "Use video conferencing instead of traveling for meetings"
      ]
    });
  }
  
  // Energy suggestions
  if (formData.energy.electricity > 300) {
    suggestions.push({
      category: "Home Energy",
      suggestions: [
        "Switch to LED bulbs throughout your home",
        "Unplug electronics when not in use to reduce phantom energy usage",
        "Consider installing a programmable thermostat",
        "Look into renewable energy options for your home"
      ]
    });
  }
  
  // Food suggestions
  const meatConsumption = (formData.food.beef || 0) + (formData.food.Legumes|| 0) + (formData.food.poultry || 0);
  if (meatConsumption > 5) {
    suggestions.push({
      category: "Diet",
      suggestions: [
        "Try having one or more meatless days per week",
        "Reduce red meat consumption and opt for poultry or fish instead",
        "Buy locally-produced food to reduce transportation emissions",
        "Reduce food waste by planning meals and using leftovers"
      ]
    });
  }
  
  // Waste suggestions
  if (formData.waste.landfill > formData.waste.recycled + formData.waste.composted) {
    suggestions.push({
      category: "Waste Management",
      suggestions: [
        "Increase recycling efforts for paper, plastic, glass, and metal",
        "Start composting food scraps and yard waste",
        "Reduce use of single-use plastics and disposable items",
        "Choose products with minimal or recyclable packaging"
      ]
    });
  }
  
  // Add general suggestions if specific ones are low
  if (suggestions.length < 2) {
    suggestions.push({
      category: "General",
      suggestions: [
        "Use reusable bags, bottles, and containers",
        "Support sustainable businesses and products",
        "Educate yourself and others about climate change",
        "Consider carbon offsets for unavoidable emissions"
      ]
    });
  }
  
  return suggestions;
};

// Function to rate the carbon footprint
export const getFootprintRating = (totalEmissions: number): { message: string; color: string } => {
  if (totalEmissions < 5000) {
    return { 
      message: "Excellent! Your carbon footprint is well below average.", 
      color: "text-green-500" 
    };
  } else if (totalEmissions < 10000) {
    return { 
      message: "Good job! Your carbon footprint is below average.", 
      color: "text-green-400" 
    };
  } else if (totalEmissions < 15000) {
    return { 
      message: "Your carbon footprint is about average.", 
      color: "text-yellow-500" 
    };
  } else if (totalEmissions < 20000) {
    return { 
      message: "Your carbon footprint is above average. Consider making some changes.", 
      color: "text-orange-500" 
    };
  } else {
    return { 
      message: "Your carbon footprint is significantly above average. Consider making substantial changes.", 
      color: "text-red-500" 
    };
  }
};
