const isLoading = {
    heroes: false,
    planets: false,
    vehicles: false,
};

const currentPage = {
    heroes: 1,
    planets: 1,
    vehicles: 1,
};

const dataTypes = {
    people: ['height', 'mass', 'hair_color', 'eye_color', 'birth_year', 'gender'],
    vehicles: ['model', 'manufacturer', 'cost_in_credits', 'length', 'max_atmosphering_speed', 'crew', 'passengers', 'cargo_capacity', 'consumables', 'vehicle_class'],
    planets: ['rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population'],
}