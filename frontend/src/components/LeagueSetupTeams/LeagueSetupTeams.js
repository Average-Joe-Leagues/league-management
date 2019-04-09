// import React from 'react';
// import axios from 'axios';
// import ShowTeams from './ShowTeams.js';
// import AddTeamToLeague from './AddTeamToLeague.js';
// import { AppContext } from '../Context/AppContext';
// import Paper from '@material-ui/core/Paper';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import withStyles from '@material-ui/core/styles/withStyles';

// const styles = theme => ({
//   main: {
//     width: 'auto',
//     display: 'block', // Fix IE 11 issue.
//     marginLeft: theme.spacing.unit * 3,
//     marginRight: theme.spacing.unit * 3,
//     marginTop: '200px',
//     [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
//       width: '60%',
//       minWidth: '200px',
//       marginLeft: 'auto',
//       marginRight: 'auto'
//     }
//   },
//   paper: {
//     marginTop: theme.spacing.unit * 8,
//     display: 'flex',
//     alignItems: 'center',
//     padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
//       .spacing.unit * 3}px`
//   },

//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing.unit
//   },
//   input: {
//     width: '60%',
//     marginRight: '7.5%',
//   },
//   submit: {
//     marginTop: theme.spacing.unit * 3
//   }
// });

// class LeagueSetupTeams extends React.Component {
//   state = {
//     leagues: this.context.state.leagues,
//     leagueIndex: this.props.leagueIndex || 0,
//     teams: []
//   };

//   render() {
//     const { leagueIndex, leagues, teams } = this.state;
//     const { classes } = this.props;

//     console.log('this.context.state.leagues: ', this.context.state.leagues);
//     // console.log('this.state.leagueIndex: ', this.state.leagueIndex);
//     // console.log('this.context.state.teams: ', this.context.state.teams);
//     return (
//       <div className={classes.main}>
//               <CssBaseline />
//         <Paper className={classes.paper}>
//         <AddTeamToLeague
//           leagues={leagues}
//           leagueIndex={leagueIndex}
//           teams={teams}
//         />
//         <ShowTeams teams={this.state.teams} />
//         </Paper>
//       </div>
//     );
//   }
// }

// LeagueSetupTeams.contextType = AppContext;

// export default withStyles(styles)(LeagueSetupTeams);

//  *************************************************************** VERSION 1.0 **************************************

// import React from 'react';
// import ShowTeams from './ShowTeams.js';
// import AddTeamToLeague from './AddTeamToLeague.js';

// class LeagueSetupTeams extends React.Component {
//   state = {
//     teams: [],
//     name: '',
//     league_id: null,
//     coach_user_id: null,
//     coach_name: null,
//     coach_email: null,
//     coach_phone: null,
//     wins: 0,
//     losses: 0,
//     ties: 0
//   };

//   InputHandler = event => {
//     event.preventDefault();
//     const target = event.target;
//     this.setState({ [target.name]: target.value });
//   };

//   addTeam = () => {
//     const { name } = this.state;
//     const newTeam = {
//       id: this.state.teams.length + 1,
//       name: name,
//       league_id: null,
//       coach_user_id: null,
//       coach_name: null,
//       coach_email: null,
//       coach_phone: null,
//       wins: 0,
//       losses: 0,
//       ties: 0
//     };
//     this.setState({ teams: [...this.state.teams, newTeam] });
//     this.setState({ name: '' });
//   };
//   render() {
//     console.log('check teams in LeagueSetupTeams.js', this.state.teams);
//     return (
//       <div>
//         <AddTeamToLeague
//           InputHandler={this.InputHandler}
//           name={this.state.name}
//           addTeam={this.addTeam}
//         />
//         <ShowTeams teams={this.state.teams} />
//       </div>
//     );
//   }
// }

// export default LeagueSetupTeams;

//  *********************************************************** VERSION 2.0 ********************************************
import React from 'react';
import axios from 'axios';
import ShowTeams from './ShowTeams.js';
import AddTeamToLeague from './AddTeamToLeague.js';
import { AppContext } from '../Context/AppContext';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: '200px',
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: '80%',
      minWidth: '200px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  input: {
    width: '60%',
    marginRight: '7.5%'
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class LeagueSetupTeams extends React.Component {
  state = {
    teams: [],
    name: '',
  };

  InputHandler = event => {
    event.preventDefault();
    const target = event.target;
    this.setState({ [target.name]: target.value });
  };

  SubmitHandler = () => {
    const newTeam = {
      name: this.state.name,
    };
    this.context.createTeamInLeague(this.state.name, this.props.index, () => {
      const lid = this.context.state.leagues[this.props.index].id;
      if(this.context.state.teams_by_league.find(x => x.league_id === lid)) {
        const teams = this.context.state.teams_by_league.find(x => x.league_id === lid).teams
        this.setState({ 
          name: '',
          teams
        })
      }
      console.log(this.state.teams);
    })
  };

  componentDidMount() {
    const lid = this.context.state.leagues[this.props.index].id;
    if(this.context.state.teams_by_league.find(x => x.league_id === lid)) {
      const teams = this.context.state.teams_by_league.find(x => x.league_id === lid).teams
      this.setState({ 
        teams
      })
    }
  }

  render() {
    const { classes } = this.props;
    console.log('teams', this.state.teams)

    return (
      <div className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <AddTeamToLeague
            InputHandler={this.InputHandler}
            name={this.state.name}
            SubmitHandler={this.SubmitHandler}
          />
          <ShowTeams teams={this.state.teams} />
          <div>
          <Button
            disabled={this.props.activeStep === 0}
            onClick={() => {
              this.props.back(this.state, this.props.index)
            }}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.props.next(this.state, this.props.index);
            }}
          >
            Next
          </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

LeagueSetupTeams.contextType = AppContext;

export default withStyles(styles)(LeagueSetupTeams);