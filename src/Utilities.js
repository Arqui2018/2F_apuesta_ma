import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export default function getNameTeam(idTeam) {
  const GET_NAME_TEAM = gql`
    query teamById($idTeam: Int!) {
      teamById(id: $idTeam) {
        name
      }
    }
  `;

  return (
    <Query query={GET_NAME_TEAM} variables={{ idTeam }}>
      {({ loading, error, data }) => {

        if (loading)
          return 'Loading...';
        if (error)
          return `Error!: ${error}`;

        return data.teamById.name.toString();
      }}
    </Query>
  );
};
