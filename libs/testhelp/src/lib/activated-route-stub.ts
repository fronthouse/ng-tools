/* eslint-disable @typescript-eslint/member-ordering */
import { BehaviorSubject } from 'rxjs';
import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ActivatedRouteStub {

    public static create(params) {
        const ar = new ActivatedRouteStub();
        ar.testParamMap = params;
        if (params['queryParams']) {
            ar.testQueryParamMap = params['queryParams'];
        }
        return ar;
    }

    public parent: ActivatedRouteStub;
    // ActivatedRoute.paramMap is Observable

    private paramMapStream = new BehaviorSubject(convertToParamMap(this.testParamMap));

    public paramMap = this.paramMapStream.asObservable();

    // Test parameters

    private _testParamMap: ParamMap;
    get testParamMap() { return this._testParamMap; }
    set testParamMap(params: Params) {
        this._testParamMap = convertToParamMap(params);
        this.paramMapStream.next(this._testParamMap);
    }

    // ActivatedRoute.paramMap is Observable

    private queryParamMapStream = new BehaviorSubject(convertToParamMap(this.testQueryParamMap));

    public queryParamMap = this.paramMapStream.asObservable();

    // Test parameters

    private _testQueryParamMap: ParamMap;
    get testQueryParamMap() { return this._testQueryParamMap; }
    set testQueryParamMap(params: Params) {
        this._testQueryParamMap = convertToParamMap(params);
        this.queryParamMapStream.next(this._testQueryParamMap);
    }

    // ActivatedRoute.snapshot.paramMap
    get snapshot() {
        return {
            paramMap: this.testParamMap,
            queryParamMap: this.testQueryParamMap
        };
    }

}
