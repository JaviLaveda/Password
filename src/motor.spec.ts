import {
  randomNumber,
  adjustValue,
  assignScore,
  addingScore,
  getImgCard,
  getStatusMessage,
} from "./motor";
import { game } from "./model";
import { expect } from "vitest";

describe("randomNumber", () => {
  it("Comprobamos que genera valores entre 1-10, ambos incluidos", () => {
    expect(randomNumber()).toBeGreaterThanOrEqual(1);
    expect(randomNumber()).toBeLessThanOrEqual(10);
  });
  it("Comprobamos que nos devuelve un número entero", () => {
    expect(randomNumber()).toBeTypeOf("number");
  });
});

describe("adjustValue", () => {
  it("Si el valor que entregamos a la función es <= 7 debería devolver el mismo valor", () => {
    //Arrange
    const value: number = 5;
    const expectedValue: number = 5;
    //Act
    const finalValue: number = adjustValue(value);
    //Assert
    expect(finalValue).toBe(expectedValue);
  });
  it("Si el valor que entregamos a la función es >= 7 debería devolver el valor + 2", () => {
    //Arrange
    const value: number = 8;
    const expectedValue: number = 10;
    //Act
    const finalValue: number = adjustValue(value);
    //Assert
    expect(finalValue).toBe(expectedValue);
  });
});

describe("assignScore", () => {
  it("Si el valor que entregamos a la función es <= 7 debería asignar un score igual a ese mismo valor", () => {
    //Arrange
    const value: number = 2;
    const expectedScore: number = 2;
    //Act
    const finalScore: number = assignScore(value);
    //Assert
    expect(finalScore).toBe(expectedScore);
  });
  it("Si el valor que entregamos a la función es >= 7 debería asignar un score de 0,5", () => {
    //Arrange
    const value: number = 10;
    const expectedScore: number = 0.5;
    //Act
    const finalScore: number = assignScore(value);
    //Assert
    expect(finalScore).toBe(expectedScore);
  });
});

describe("addingScore", () => {
  it("La función debería sumar el nuevo score de la carta al score del usuario", () => {
    //Arrange
    game.userScore = 3;
    const cardScore: number = 4;
    const result: number = 7;
    //Act
    const newUserScore: number = addingScore(cardScore);
    //Assert
    expect(newUserScore).toBe(result);
  });
});

describe("getImgCard", () => {
  it("Debería devolver un string con la URL correspondiente a la imagen de cada carta según el valor que le pasemos siempre que sea distinto de 0", () => {
    //Arrange
    const value: number = 1;
    const expectedString: string =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
    //Act
    const urlString: string = getImgCard(value);
    //Assert
    expect(urlString).toBe(expectedString);
  });
  it("Debería devolver un string con la URL correspondiente a la imagen de la carta boca abajo para el valor 0", () => {
    //Arrange
    const value: number = 0;
    const expectedString: string =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
    //Act
    const urlString: string = getImgCard(value);
    //Assert
    expect(urlString).toBe(expectedString);
  });
});

describe("getStatusMessage", () => {
  it("Si el valor que le pasamos es menor que maxScore debería de devolver mensaje de seguir jugando", () => {
    //Arrange
    const value: number = 7;
    const message: string = "¡Sigue jugando!";
    //Act
    const statusMessage: string = getStatusMessage(value);
    //Assert
    expect(statusMessage).toBe(message);
  });
  it("Si el valor que le pasamos es mayor que maxScore debería de devolver mensaje de has perdido", () => {
    //Arrange
    const value: number = 8;
    const message: string = "¡GAME OVER!";
    //Act
    const statusMessage: string = getStatusMessage(value);
    //Assert
    expect(statusMessage).toBe(message);
  });
  it("Si el valor que le pasamos es igual que maxScore debería de devolver mensaje de has ganado", () => {
    //Arrange
    const value: number = 7.5;
    const message: string = "¡Lo has clavado!¡Enhorabuena!";
    //Act
    const statusMessage: string = getStatusMessage(value);
    //Assert
    expect(statusMessage).toBe(message);
  });
});
