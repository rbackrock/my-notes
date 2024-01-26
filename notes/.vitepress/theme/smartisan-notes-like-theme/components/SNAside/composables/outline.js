export function getHeaderStructure() {
  const headers = [
    ...document.querySelectorAll('.layout__container :where(h1, h2, h3, h4, h5, h6)')
  ]
  .filter(el => el.id && el.hasChildNodes())
  .map(el => {
    const hNum = Number(el.tagName[1])
    let level = hNum
    if (hNum > 3) {
      level = 3
    }

    return {
      title: el.id,
      link: '#' + el.id,
      level,
      children: []
    }
  })

  return makeOutlineData(headers)
}

function makeOutlineData(arr, chunkLevelRule) {
  const chunkArray = []
  for (let i = 0, tmp = null; i < arr.length; i++) {
    const current = arr[i]

    if (i === 0 && !chunkLevelRule) {
      chunkLevelRule = current.level
    }

    if (current.level === chunkLevelRule) {
      if (tmp !== null) {
        if (tmp.children.length > 0) {
          tmp.children = makeOutlineData(tmp.children, tmp.children[0].level)
        }

        chunkArray.push(tmp)
      }

      tmp = {
        ...current
      }
    } else {
      tmp.children.push({...current})
    }

    if (i === arr.length - 1) {
      if (tmp !== null) {
        if (tmp.children.length > 0) {
          tmp.children = makeOutlineData(tmp.children, tmp.children[0].level)
        }

        chunkArray.push(tmp)
      }
    }
  }

  return chunkArray
}