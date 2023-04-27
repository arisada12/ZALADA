import { Component, ViewChild, OnChanges, ElementRef, Input } from '@angular/core';
import { LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, Map, Marker, icon, map, marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {

  private MARKER_ZOOM_lEVEL = 16
  private MARKER_ICON = icon({
    iconUrl: "../../../../assets/map-marker.png",
    iconSize: [30,30],
    iconAnchor: [15, 30]
  })

  private readonly DEFAULT_LATLNG: LatLngTuple = [0.87, 112.92]

  @Input()order!:Order
  @Input()readonly = false
  @ViewChild("map", {static:true}) mapRef!: ElementRef

  map!:Map
  currMarker!:Marker

  constructor(private locationService:LocationService){}

  ngOnChanges(): void {
    if(!this.order) return
    this.initMap()

    if(this.readonly && this.addressLatLng){
      this.showLocationOnReadonlyMode()
    }
  }
  showLocationOnReadonlyMode() {
    const m = this.map
    this.setMarker(this.addressLatLng)
    m.setView(this.addressLatLng, this.MARKER_ZOOM_lEVEL)

    m.dragging.disable()
    m.touchZoom.disable()
    m.doubleClickZoom.disable()
    m.scrollWheelZoom.disable()
    m.boxZoom.disable()
    m.keyboard.disable()
    m.off("click")
    m.tap?.disable()
    this.currMarker.dragging?.disable()
  }

  initMap(){
    if(this.map) return

    this.map = map(this.mapRef.nativeElement, {
      attributionControl:false
    }).setView(this.DEFAULT_LATLNG, 1)

    tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map)
    this.map.on("click", (e:LeafletMouseEvent)=>{
      this.setMarker(e.latlng)
    })
  }

  findMyLocation(){
    this.locationService.getCurrLocation().subscribe({
      next: (latlng)=>{
        this.map.setView(latlng, this.MARKER_ZOOM_lEVEL)
        this.setMarker(latlng)
      }
    })
  }

  setMarker(latlng:LatLngExpression){
    this.addressLatLng = latlng as LatLng
    if(this.currMarker){
      this.currMarker.setLatLng(latlng)
      return
    }
    this.currMarker = marker(latlng,{
      draggable:true,
      icon:this.MARKER_ICON
    }).addTo(this.map)
    this.currMarker.on("dragend", ()=>{
      this.addressLatLng = this.currMarker.getLatLng()
    })
  }

  set addressLatLng(latlng:LatLng){
    if(!latlng.lat.toFixed) return

    latlng.lat = parseFloat(latlng.lat.toFixed(8))
    latlng.lng = parseFloat(latlng.lng.toFixed(8))
    this.order.addressLatLng = latlng
  }

  get addressLatLng(){
    return this.order.addressLatLng!
  }

}
