import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  Car, 
  Home, 
  Lightbulb, 
  Leaf, 
  Recycle, 
  PanelTop,
  ArrowRight, 
  Bike, 
  Bus,
  Train,
  Plane
} from "lucide-react";
import { 
  calculateTotalEmissions, 
  getReductionSuggestions,
  getFootprintRating 
} from "@/lib/calculatorUtils";

type FormData = {
  transportation: {
    type: string;
    distance: number;
    isCar?: boolean;
  };
  energy: {
    electricity: number;
    naturalGas: number;
    heating?: {
      type: string;
      amount: number;
    };
  };
  food: {
    [key: string]: number;
  };
  waste: {
    landfill: number;
    recycled: number;
    composted: number;
  };
};

const Calculator = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    transportation: {
      type: "car",
      distance: 50,
      isCar: true
    },
    energy: {
      electricity: 300,
      naturalGas: 50,
      heating: {
        type: "oil",
        amount: 30
      }
    },
    food: {
      RedMeat: 2,
      Legumes: 2,
      poultry: 3,
      fish: 1,
      dairy: 5,
      eggs: 1,
      grains: 5,
      vegetables: 5,
      fruits: 4,
      processed: 3
    },
    waste: {
      landfill: 8,
      recycled: 5,
      composted: 2
    }
  });
  
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [footprintRating, setFootprintRating] = useState<any>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            entry.target.classList.remove('opacity-0');
            entry.target.classList.add('opacity-100');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach(el => observer.observe(el));
    
    return () => {
      elements?.forEach(el => observer.unobserve(el));
    };
  }, []);

  const calculateResults = () => {
    const emissions = calculateTotalEmissions(formData);
    setTotalEmissions(emissions);
    
    const recommendedSuggestions = getReductionSuggestions(formData, emissions);
    setSuggestions(recommendedSuggestions);
    
    const rating = getFootprintRating(emissions);
    setFootprintRating(rating);
    
    setShowResults(true);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartOver = () => {
    setShowResults(false);
    setCurrentStep(1);
    setFormData({
      transportation: {
        type: "car",
        distance: 50,
        isCar: true
      },
      energy: {
        electricity: 300,
        naturalGas: 50,
        heating: {
          type: "oil",
          amount: 30
        }
      },
      food: {
        RedMeat: 2,
        Legumes: 2,
        poultry: 3,
        fish: 1,
        dairy: 5,
        eggs: 1,
        grains: 5,
        vegetables: 5,
        fruits: 4,
        processed: 3
      },
      waste: {
        landfill: 8,
        recycled: 5,
        composted: 2
      }
    });
    setTotalEmissions(0);
    setSuggestions([]);
    setFootprintRating(null);
  };

  const handleInputChange = (category: string, field: string, value: any, subField?: string) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (subField) {
        (newData as any)[category][field][subField] = value;
      } else {
        (newData as any)[category][field] = value;
      }
      
      return newData;
    });
  };

  const renderTransportationStep = () => (
    <div className="space-y-6 animate-on-scroll opacity-0 transition-all duration-700" 
         style={{ maxHeight: currentStep === 1 ? '1000px' : '0', overflow: 'hidden' }}>
      <h3 className="text-xl font-semibold mb-4">Transportation</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Primary mode of transportation</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { icon: <Car className="h-6 w-6" />, label: "Car", value: "car" },
              { icon: <Bus className="h-6 w-6" />, label: "Bus", value: "bus" },
              { icon: <Train className="h-6 w-6" />, label: "Train", value: "train" },
              { icon: <Plane className="h-6 w-6" />, label: "Plane", value: "plane" },
              { icon: <Bike className="h-6 w-6" />, label: "Bike", value: "bike" }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleInputChange('transportation', 'type', option.value, undefined)}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-lg border transition-all",
                  formData.transportation.type === option.value
                    ? "border-carbon-primary bg-carbon-light text-carbon-dark"
                    : "border-border hover:border-carbon-accent hover:bg-carbon-light/30"
                )}
              >
                {option.icon}
                <span className="mt-2 text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {formData.transportation.type === "car" && (
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Small", value: "small" },
                { label: "Medium", value: "medium" },
                { label: "Large/SUV", value: "large" },
                { label: "Hybrid", value: "hybrid" },
                { label: "Electric", value: "electric" }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    handleInputChange('transportation', 'type', option.value, undefined);
                    handleInputChange('transportation', 'isCar', true, undefined);
                  }}
                  className={cn(
                    "p-2 rounded-lg border text-sm transition-all",
                    formData.transportation.type === option.value && formData.transportation.isCar
                      ? "border-carbon-primary bg-carbon-light text-carbon-dark"
                      : "border-border hover:border-carbon-accent hover:bg-carbon-light/30"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <label htmlFor="distance" className="block text-sm font-medium mb-1">
            Average distance traveled per week (kilometers\km)
          </label>
          <input
            id="distance"
            type="range"
            min="0"
            max="500"
            step="5"
            value={formData.transportation.distance}
            onChange={(e) => handleInputChange('transportation', 'distance', parseInt(e.target.value), undefined)}
            className="w-full h-2 bg-carbon-light rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>100</span>
            <span>200</span>
            <span>300</span>
            <span>400</span>
            <span>500</span>
          </div>
          <div className="text-center mt-2 text-sm font-medium">
            {formData.transportation.distance} kilometers per week
          </div>
        </div>
      </div>
    </div>
  );

  const renderEnergyStep = () => (
    <div className="space-y-6 animate-on-scroll opacity-0 transition-all duration-700"
         style={{ maxHeight: currentStep === 2 ? '1000px' : '0', overflow: 'hidden' }}>
      <h3 className="text-xl font-semibold mb-4">Home Energy</h3>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="electricity" className="block text-sm font-medium mb-1">
            Monthly electricity consumption (kWh)
          </label>
          <div className="flex items-center space-x-3">
            <Lightbulb className="h-5 w-5 text-muted-foreground" />
            <input
              id="electricity"
              type="range"
              min="0"
              max="1000"
              step="10"
              value={formData.energy.electricity}
              onChange={(e) => handleInputChange('energy', 'electricity', parseInt(e.target.value), undefined)}
              className="flex-1 h-2 bg-carbon-light rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium w-12 text-right">{formData.energy.electricity}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Low</span>
            <span>Average</span>
            <span>High</span>
          </div>
        </div>
        
        <div>
          <label htmlFor="naturalGas" className="block text-sm font-medium mb-1">
            Monthly natural gas consumption (therms)
          </label>
          <div className="flex items-center space-x-3">
            <Home className="h-5 w-5 text-muted-foreground" />
            <input
              id="naturalGas"
              type="range"
              min="0"
              max="200"
              step="5"
              value={formData.energy.naturalGas}
              onChange={(e) => handleInputChange('energy', 'naturalGas', parseInt(e.target.value), undefined)}
              className="flex-1 h-2 bg-carbon-light rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium w-12 text-right">{formData.energy.naturalGas}</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Low</span>
            <span>Average</span>
            <span>High</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-3">Heating type</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Oil", value: "oil" },
              { label: "Propane", value: "propane" }
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleInputChange('energy', 'heating', { ...formData.energy.heating, type: option.value }, undefined)}
                className={cn(
                  "p-2 rounded-lg border text-sm transition-all",
                  formData.energy.heating?.type === option.value
                    ? "border-carbon-primary bg-carbon-light text-carbon-dark"
                    : "border-border hover:border-carbon-accent hover:bg-carbon-light/30"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="heatingAmount" className="block text-sm font-medium mb-1">
            Monthly heating consumption (gallons)
          </label>
          <div className="flex items-center space-x-3">
            <PanelTop className="h-5 w-5 text-muted-foreground" />
            <input
              id="heatingAmount"
              type="range"
              min="0"
              max="100"
              step="5"
              value={formData.energy.heating?.amount || 0}
              onChange={(e) => handleInputChange('energy', 'heating', { ...formData.energy.heating, amount: parseInt(e.target.value) }, undefined)}
              className="flex-1 h-2 bg-carbon-light rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium w-12 text-right">{formData.energy.heating?.amount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFoodStep = () => (
    <div className="space-y-6 animate-on-scroll opacity-0 transition-all duration-700"
         style={{ maxHeight: currentStep === 3 ? '1000px' : '0', overflow: 'hidden' }}>
      <h3 className="text-xl font-semibold mb-4">Food Consumption</h3>
      <p className="text-muted-foreground mb-4">
        Estimate your weekly consumption of each food category in kilograms (1 kg ≈ 2.2 lbs).
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "RedMeat", key: "RedMeat" },
          { label: "Legumes", key: "Legumes" },
          { label: "Poultry", key: "poultry" },
          { label: "Fish", key: "fish" },
          { label: "Dairy", key: "dairy" },
          { label: "Eggs", key: "eggs" },
          { label: "Grains", key: "grains" },
          { label: "Vegetables", key: "vegetables" },
          { label: "Fruits", key: "fruits" },
          { label: "Processed Foods", key: "processed" }
        ].map((item) => (
          <div key={item.key} className="space-y-1">
            <div className="flex justify-between">
              <label htmlFor={item.key} className="block text-sm font-medium">
                {item.label}
              </label>
              <span className="text-sm font-medium">
                {(formData.food as any)[item.key]} kg/week
              </span>
            </div>
            <input
              id={item.key}
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={(formData.food as any)[item.key]}
              onChange={(e) => handleInputChange('food', item.key, parseFloat(e.target.value), undefined)}
              className="w-full h-2 bg-carbon-light rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWasteStep = () => (
    <div className="space-y-6 animate-on-scroll opacity-0 transition-all duration-700"
         style={{ maxHeight: currentStep === 4 ? '1000px' : '0', overflow: 'hidden' }}>
      <h3 className="text-xl font-semibold mb-4">Waste Management</h3>
      <p className="text-muted-foreground mb-4">
        Estimate your weekly waste production in kilograms.
      </p>
      
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="flex justify-between">
            <label htmlFor="landfill" className="block text-sm font-medium">
              Landfill Waste
            </label>
            <span className="text-sm font-medium">
              {formData.waste.landfill} kg/week
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Recycle className="h-5 w-5 text-muted-foreground" />
            <input
              id="landfill"
              type="range"
              min="0"
              max="30"
              step="1"
              value={formData.waste.landfill}
              onChange={(e) => handleInputChange('waste', 'landfill', parseInt(e.target.value), undefined)}
              className="flex-1 h-2 bg-carbon-light rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <label htmlFor="recycled" className="block text-sm font-medium">
              Recycled Waste
            </label>
            <span className="text-sm font-medium">
              {formData.waste.recycled} kg/week
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Recycle className="h-5 w-5 text-carbon-primary" />
            <input
              id="recycled"
              type="range"
              min="0"
              max="30"
              step="1"
              value={formData.waste.recycled}
              onChange={(e) => handleInputChange('waste', 'recycled', parseInt(e.target.value), undefined)}
              className="flex-1 h-2 bg-carbon-light rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <label htmlFor="composted" className="block text-sm font-medium">
              Composted Waste
            </label>
            <span className="text-sm font-medium">
              {formData.waste.composted} kg/week
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Leaf className="h-5 w-5 text-carbon-primary" />
            <input
              id="composted"
              type="range"
              min="0"
              max="30"
              step="1"
              value={formData.waste.composted}
              onChange={(e) => handleInputChange('waste', 'composted', parseInt(e.target.value), undefined)}
              className="flex-1 h-2 bg-carbon-light rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-carbon-light text-carbon-dark text-sm font-medium mb-2">
          Your Results
        </span>
        <h3 className="text-2xl md:text-3xl font-display font-bold">
          Your Carbon Footprint
        </h3>
      </div>
      
      <div className="mb-8">
        <div className="bg-carbon-light/30 rounded-xl p-6 md:p-8 text-center">
          <h4 className="text-lg font-medium mb-2">Annual Carbon Footprint</h4>
          <div className="text-3xl md:text-4xl font-display font-bold mb-2">
            {Math.round(totalEmissions).toLocaleString()} kg CO<sub>2</sub>e
          </div>
          <p className={cn("font-medium", footprintRating?.color)}>
            {footprintRating?.message}
          </p>
        </div>
      </div>
      
      <div className="space-y-6 mb-8">
        <h4 className="text-xl font-semibold">Recommended Actions</h4>
        
        <div className="space-y-4">
          {suggestions.map((category, idx) => (
            <div key={idx} className="glassmorphism rounded-lg p-4">
              <h5 className="font-semibold mb-3">{category.category}</h5>
              <ul className="space-y-2">
                {category.suggestions.map((suggestion: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <Leaf className="h-5 w-5 text-carbon-primary shrink-0 mt-0.5" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleStartOver}
          className="inline-flex h-10 items-center justify-center rounded-md bg-carbon-primary px-6 py-2 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-carbon-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Start Over
        </button>
      </div>
    </div>
  );

  return (
    <section 
      id="calculator" 
      ref={sectionRef}
      className="py-20"
    >
      <div className="section-container">
        <div className="text-center mb-12 animate-on-scroll opacity-0 transition-all duration-700">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
            Calculate Your <span className="text-gradient">Carbon Footprint</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Answer a few simple questions about your lifestyle to estimate your carbon footprint
            and discover personalized ways to reduce your impact.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto glassmorphism rounded-xl p-6 md:p-8">
          {!showResults ? (
            <>
              <div className="mb-8">
                <div className="relative">
                  <div className="flex justify-between items-center">
                    {[1, 2, 3, 4].map((step) => (
                      <div 
                        key={step}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium z-10 transition-colors",
                          step === currentStep
                            ? "bg-carbon-primary text-white"
                            : step < currentStep
                              ? "bg-carbon-dark text-white"
                              : "bg-carbon-light text-carbon-dark"
                        )}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                  <div className="absolute h-[2px] top-5 left-0 right-0 bg-carbon-light -z-0 mx-5">
                    <div
                      className="h-full bg-carbon-primary transition-all duration-300 ease-in-out"
                      style={{ width: `${(currentStep - 1) * 33.33}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Transportation</span>
                  <span>Energy</span>
                  <span>Food</span>
                  <span>Waste</span>
                </div>
              </div>
              
              <div className="mb-8">
                {renderTransportationStep()}
                {renderEnergyStep()}
                {renderFoodStep()}
                {renderWasteStep()}
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={cn(
                    "h-10 px-4 py-2 rounded-md border text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    currentStep === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-secondary"
                  )}
                >
                  Back
                </button>
                
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-carbon-primary px-6 py-2 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-carbon-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {currentStep < 4 ? (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Calculate Results"
                  )}
                </button>
              </div>
            </>
          ) : (
            renderResults()
          )}
        </div>
      </div>
    </section>
  );
};

export default Calculator;
