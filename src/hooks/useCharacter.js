import { useQuery, gql } from '@apollo/client';

//ID! the id type
const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      gender
      image
      origin{
        name
      }
      episode {
        name
        episode
      }
    }
  }
`;

export const useCharacter = (id) => {
  const { error, loading, data } = useQuery(GET_CHARACTER, {
    variables: {
      id,
    },
  }); //pass the id through the options/variables object
  return { error, loading, data };
};
