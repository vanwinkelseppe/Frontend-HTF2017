import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { FullTeam } from '../models/fullteam';
import { Team } from '../models/team';
import { Angulartics2 } from 'angulartics2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-team',
  templateUrl: './modify-team.component.html',
  styleUrls: ['./modify-team.component.css']
})
export class ModifyTeamComponent implements OnInit {

  public teamId: string;
  public team: Team = new Team();
  public modifiedTeam: FullTeam;
  public modified: boolean;
  public confirmPassword: string;
  public hasError = false;
  public error: string;

  constructor(private angulartics2: Angulartics2, private teamService: TeamService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamId = params['id'];
    });
    if (!!localStorage.getItem('teamId')) {
      this.teamId = localStorage.getItem('teamId');
    }
  }

  modifyTeam() {
    this.hasError = false;
    // tslint:disable-next-line:max-line-length
    this.teamService.modifyTeam(this.teamId, this.team).subscribe(result => {
      this.modifiedTeam = result;
      this.modified = true;
      this.angulartics2.eventTrack.next({
        action: 'Modify Team',
        properties: { category: 'action' },
      });
    }, err => {
      this.hasError = true;
      this.error = err;
    });
  }
}
