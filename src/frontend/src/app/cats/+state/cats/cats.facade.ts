
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {LoadCats, LoadRandomCat, RateCat} from './cats.actions';
import {State} from '../../../store.utils';
import {CatModel} from './cats.model';
import {RateCatPayload} from '../../cat';
import {CatsSelectors} from './cats.selectors';

@Injectable({
	providedIn: 'root'
})
export class CatsFacade {

	public cats$: Observable<Array<CatModel>> = this.store.select(CatsSelectors.getAllCats$);
	public activeCat$: Observable<CatModel | null> = this.store.select(CatsSelectors.getActiveCat$);
	public isLoading$ = this.store.select(CatsSelectors.isLoading$)

	constructor(private store: Store) {}

	public loadAllCats$(): Observable<State> {
		return this.store.dispatch(new LoadCats());
	}

	public loadRandomCat$(): Observable<State> {
		return this.store.dispatch(new LoadRandomCat());
	}

	public rateCat$(payload: RateCatPayload): Observable<State> {
		return this.store.dispatch(new RateCat(payload));
	}

}
