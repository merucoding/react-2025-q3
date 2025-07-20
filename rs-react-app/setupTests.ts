import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const POKEMONS_LIST = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    // ...
  ],
};

export const restHandlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/pikachu', () => {
    return HttpResponse.json({
      name: 'pikachu',
      height: 4,
      weight: 60,
    });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/bbb', () => {
    return new HttpResponse('Not found', { status: 404 });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/p.', () => {
    return new HttpResponse(null, { status: 400 });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/forServerError', () => {
    return new HttpResponse(null, { status: 500 });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20', () => {
    return HttpResponse.json(POKEMONS_LIST);
  }),
  http.get(POKEMONS_LIST.results[0].url, () => {
    return HttpResponse.json({
      name: 'bulbasaur',
      height: 7,
      weight: 69,
    });
  }),
  http.get(POKEMONS_LIST.results[1].url, () => {
    return HttpResponse.json({
      name: 'ivysaur',
      height: 10,
      weight: 130,
    });
  }),
];

export const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers());
