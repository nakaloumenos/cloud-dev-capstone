import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { getAvailablePets } from '../api/pets-api'
import Auth from '../auth/Auth'
import { Pet } from '../types/Pet'

interface PetsProps {
  auth: Auth
  history: History
}

interface PetsState {
  pets: Pet[]
  loadingPets: boolean
}

export class Pets extends React.PureComponent<PetsProps, PetsState> {
  state: PetsState = {
    pets: [],
    loadingPets: true
  }

  async componentDidMount() {
    try {
      const pets = await getAvailablePets(this.props.auth.getIdToken())
      this.setState({
        pets,
        loadingPets: false
      })
    } catch (e) {
      alert(`Failed to fetch pets: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">
          Available pets to walk and pretend they are yours...
        </Header>

        {this.renderPets()}
      </div>
    )
  }

  renderPets() {
    if (this.state.loadingPets) {
      return this.renderLoading()
    }

    return this.renderPetsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Pets
        </Loader>
      </Grid.Row>
    )
  }

  renderPetsList() {
    return (
      <Grid padded>
        {this.state.pets.map((pet, pos) => {
          return (
            <Grid.Row key={pet.petId}>
              <Grid.Column width={10} verticalAlign="middle">
                {pet.name}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {pet.description}
              </Grid.Column>
              {pet.attachmentUrl && (
                <Image src={pet.attachmentUrl} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }

  calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  }
}
