import React, { useState, FormEvent } from "react";
import fetchDrinks from "../../api/fetchDrink";

interface IDrink {
  idDrink: string;
  strDrinkThumb: string;
  strDrink: string;
  strInstructions: string;
  [key: string]: string | null;
}

const DrinkSearchAPITest: React.FC = () => {
  const [drinks, setDrinks] = useState<IDrink[]>([]);
  const [drinkQuery, setDrinkQuery] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  const handleDrinkQuery = async (e: FormEvent) => {
    e.preventDefault();
    if (drinkQuery) {
      try {
        const data = await fetchDrinks(drinkQuery);
        setDrinks(data);
      } catch (error) {
        setError(error as Error);
      }
    }

    setDrinkQuery("");
  };

  const drinkResults = () => {
    const ingredientList = (drink: IDrink) => {
      const ingredients = [];
      const maxIngredients = 15;
      for (let i = 1; i <= maxIngredients; i++) {
        const ingredient = drink["strIngredient" + i];
        if (ingredient) {
          ingredients.push(ingredient);
        }
      }
      return ingredients;
    };

    return drinks.map((drink) => {
      return (
        <div
          key={drink.idDrink}
          className="card m-2"
          style={{ width: "20rem" }}
        >
          <img
            src={drink.strDrinkThumb}
            className="card-img-top"
            alt={drink.strDrink}
          />
          <div className="card-body">
            <h5 className="card-title text-center">{drink.strDrink}</h5>
            <h6 className="text-center font-weight-bold">Ingredients</h6>
            <div className="d-flex flex-wrap justify-content-center border-top">
              {ingredientList(drink).map((ingredient, index) => (
                <div className="p-1" key={ingredient + index}>
                  {ingredient}
                </div>
              ))}
            </div>
            <h6 className="text-center font-weight-bold">Instructions</h6>
            <p className="card-text border-top">{drink.strInstructions}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <form className="form-group m-auto w-50 pt-2" onSubmit={handleDrinkQuery}>
        <input
          className="form-control"
          placeholder="search for a drink..."
          type="search"
          value={drinkQuery}
          onChange={(event) => setDrinkQuery(event.target.value)}
        />
        <button className="btn btn-primary mt-2 btn-block" type="submit">
          Search
        </button>
      </form>
      {drinks && <div className="d-flex flex-wrap">{drinkResults()}</div>}
      {!drinks && <h5 className="text-center mt-5">🍹 No drinks found 🍹</h5>}
      {error && <h5 className="text-center mt-5">🛑 Service unavailable 🛑</h5>}
    </div>
  );
};

export default DrinkSearchAPITest;
