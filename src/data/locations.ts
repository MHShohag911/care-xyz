export interface Area {
  name: string;
}

export interface City {
  name: string;
  areas: Area[];
}

export interface District {
  name: string;
  cities: City[];
}

export interface Division {
  name: string;
  districts: District[];
}

/* export const locationData: LocationData = {
  divisions: [
    "Dhaka",
    "Chattogram",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
  ],
};
 */
export const locationData: Division[] = [
  {
    name: "Dhaka",
    districts: [
      {
        name: "Dhaka",
        cities: [
          {
            name: "Dhaka City",
            areas: [
              { name: "Dhanmondi" },
              { name: "Mirpur" },
              { name: "Uttara" },
              { name: "Gulshan" },
              { name: "Mohammadpur" },
            ],
          },
        ],
      },
      {
        name: "Gazipur",
        cities: [
          {
            name: "Gazipur City",
            areas: [
              { name: "Tongi" },
              { name: "Joydebpur" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Chattogram",
    districts: [
      {
        name: "Chattogram",
        cities: [
          {
            name: "Chattogram City",
            areas: [
              { name: "Agrabad" },
              { name: "Panchlaish" },
              { name: "Halishahar" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Rajshahi",
    districts: [
      {
        name: "Rajshahi",
        cities: [
          {
            name: "Rajshahi City",
            areas: [
              { name: "Boalia" },
              { name: "Motihar" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Khulna",
    districts: [
      {
        name: "Khulna",
        cities: [
          {
            name: "Khulna City",
            areas: [
              { name: "Boalia" },
              { name: "Motihar" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Barishal",
    districts: [
      {
        name: "Barishal",
        cities: [
          {
            name: "Barishal City",
            areas: [
              { name: "Boalia" },
              { name: "Motihar" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Sylhet",
    districts: [
      {
        name: "Sylhet",
        cities: [
          {
            name: "Sylhet City",
            areas: [
              { name: "Boalia" },
              { name: "Motihar" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Rangpur",
    districts: [
      {
        name: "Rangpur",
        cities: [
          {
            name: "Rangpur City",
            areas: [
              { name: "Boalia" },
              { name: "Motihar" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Mymenshingh",
    districts: [
      {
        name: "Mymenshingh",
        cities: [
          {
            name: "Mymenshingh City",
            areas: [
              { name: "Boalia" },
              { name: "Motihar" },
            ],
          },
        ],
      },
    ],
  },
];