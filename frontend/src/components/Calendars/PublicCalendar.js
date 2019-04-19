import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../App.css';
import './calendar.css';
import { AppContext } from '../Context/AppContext';
import DragAndDropCalendar from './DnDCalendar';
import { LockOutlined, EditOutlined } from '@material-ui/icons';

const localizer = Calendar.momentLocalizer(moment);

class PublicCalendar extends Component {
  state = {
    isLoading: true,
    edit: false,
    games: [],
    schedule_by_league: []
  };

  componentDidMount() {
    this.showGames();
  }

  showGames = async () => {
    if (this.props.index) {
      const lid = this.context.state.leagues[this.props.index].id;
      if (
        this.context.state.schedule_by_league.find(x => x.league_id === lid)
      ) {
        const games = this.context.state.schedule_by_league.find(
          x => x.league_id === lid
        ).games;
        await this.setState({
          games
        });
      }
    } else if (this.props.location.state.leagues) {
      const leagues = this.props.location.state.leagues;
      const lid = this.props.location.state.lid;
      console.log('leagues', leagues);
      console.log('lid', lid);
      console.log(
        'this.context.state.schedule_by_league',
        this.context.state.schedule_by_league
      );
      axios
        .get(`/search/${lid}/schedule`)
        .then(res => {
          const games = res.data;
          // console.log('schedule', res.data);
          // const scheduleJoined = this.state.schedule_by_league.concat({
          //   games
          // });
          this.setState({
            games
            // : scheduleJoined[0].games
          });
          console.log(this.state.games);
          // const newGames = schedule_by_league[0].games;
          // console.log(newGames);
        })
        .catch(err => {
          console.log('error from getTeams by league id', err);
        });
    }

    const displayEvents = await this.state.games.map(event => {
    console.log(this.state.games);

      console.log(event);
      console.log(
        'Public Calendar. Mapping through events - Start: ',
        event.start_time
      );
      event.start = new Date(event.start_time);
      console.log(
        'Public Calendar. Mapping through events - End: ',
        event.end_time
      );
      event.end = new Date(event.end_time);
      event.title = `${event.away_team_name} vs ${event.home_team_name}`;
      return event;
    });
    await this.setState({ publicEvents: displayEvents, isLoading: false });
    console.log(displayEvents);

  };

  customEventPropGetter = event => {
    return {
      style: {
        color: '#fff',
        textAlign: 'center',
        boxShadow: '1px 1px 5px black',
        backgroundColor: '#ef6c00ed',
        margin: '0 5px',
        fontFamily: 'Montserrat'
      }
    };
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="App">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#333',
              height: '90vh'
            }}
          >
            Loading...
          </div>
        </div>
      );
    }
    if (!this.state.edit) {
      return (
        <div className="App">
          <div className="updateBtn" onClick={this.props.toggleEdit}>
            <EditOutlined />
          </div>
          <Calendar
            localizer={localizer}
            min={new Date(2019, 0, 0, 8, 0)}
            max={new Date(2019, 0, 0, 23, 0)}
            defaultDate={new Date()}
            defaultView="week"
            events={this.state.publicEvents}
            style={{
              height: '83vh',
              padding: '10px .5%',
              fontFamily: 'Montserrat',
              backgroundColor: 'white'
            }}
            eventPropGetter={this.customEventPropGetter}
          />
        </div>
      );
    } else {
      return <DragAndDropCalendar />;
    }
  }
}

PublicCalendar.contextType = AppContext;

export default PublicCalendar;
