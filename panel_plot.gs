function main()

rc=gsfallow("on")

'reinit'
'sdfopen FILE_NAME.nc'

nrows = INTIGER
ncols = INTIGER
ppage = nrows*ncols

nt = INTIGER *Tsize
npages = math_int((nt+ppage-1)/ppage)

page = 1

while(page<=npages)

'clear'
'set vpage off'

panels(nrows' 'ncols)

*------------------------------------------

* Reserve space:
* Top    = 0.5 inch (page title)
* Bottom = 0.5 inch (colorbar or anything)
*  ------------------------------------------

i=1
while(i<=ppage)


cmd = _vpg.i

xlo = subwrd(cmd,3)
xhi = subwrd(cmd,4)
ylo = subwrd(cmd,5)
yhi = subwrd(cmd,6)

ylo = 0.5 + (ylo/8.5)*7.5
yhi = 0.5 + (yhi/8.5)*7.5

_vpg.i = 'set vpage 'xlo' 'xhi' 'ylo' 'yhi

i=i+1


endwhile

*------------------------------------------

* Rainfall colour palette
*  ------------------------------------------

  'set rgb 17 180 255 180'
  'set rgb 18 100 220 100'
  'set rgb 19 255 255 0'
  'set rgb 20 255 180 0'
  'set rgb 21 255 0 0'
  'set rgb 22 180 0 180'
  'set rgb 23 120 0 120'

*------------------------------------------

* Page title
*  ------------------------------------------

  'set string 1 tc 8'

  pstart = (page-1)*ppage + 1
  pend   = page*ppage
  if (pend > nt)
  pend = nt
  endif

  'draw string 5.5 8.3 TITLE - Page 'page

*------------------------------------------

* Draw panels
*  ------------------------------------------

  p = 1

  while(p<=ppage)

  t = (page-1)*ppage + p

  if (t > nt)
  break
  endif

  _vpg.p

  'set grads off'

  'set lon 85 96'
  'set lat 18 28'

  'set mpdset hires'
  'set map 1 1 2'

  'set gxout shaded'

  'set clevs 1 5 10 20 30 40 50'
  'set ccols 17 18 19 20 21 22 23'

  'set t 't
  'd VARIABLE_NAME'

*------------------------------------------

* Timestamp
*  ------------------------------------------

  'q time'
  timstr = subwrd(result,3)

  'draw title 'timstr

*------------------------------------------

* Color bar
*  ------------------------------------------

  'run cbarn'

  p = p + 1

  endwhile

*------------------------------------------

* Save page
*  ------------------------------------------

  outfile = 'page0'page'.png'
  if (page >= 10)
  outfile = 'page'page'.png'
  endif

  'printim 'outfile' x3600 y2700 white'

  page = page + 1

endwhile

return
