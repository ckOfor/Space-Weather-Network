;; Data Collection Contract

(define-map observatory-data
  { observatory-id: (string-ascii 50) }
  {
    name: (string-utf8 100),
    location: (string-utf8 100),
    data-type: (string-ascii 50),
    last-update: uint
  }
)

(define-map collected-data
  { data-id: uint }
  {
    observatory-id: (string-ascii 50),
    timestamp: uint,
    data-hash: (buff 32),
    data-type: (string-ascii 50)
  }
)

(define-data-var data-count uint u0)

(define-public (register-observatory (id (string-ascii 50)) (name (string-utf8 100)) (location (string-utf8 100)) (data-type (string-ascii 50)))
  (ok (map-set observatory-data
    { observatory-id: id }
    {
      name: name,
      location: location,
      data-type: data-type,
      last-update: u0
    }
  ))
)

(define-public (submit-data (observatory-id (string-ascii 50)) (data-hash (buff 32)) (data-type (string-ascii 50)))
  (let
    (
      (new-data-id (+ (var-get data-count) u1))
    )
    (map-set collected-data
      { data-id: new-data-id }
      {
        observatory-id: observatory-id,
        timestamp: block-height,
        data-hash: data-hash,
        data-type: data-type
      }
    )
    (map-set observatory-data
      { observatory-id: observatory-id }
      (merge (unwrap! (map-get? observatory-data { observatory-id: observatory-id }) (err u404))
        { last-update: block-height }
      )
    )
    (var-set data-count new-data-id)
    (ok new-data-id)
  )
)

(define-read-only (get-observatory-info (id (string-ascii 50)))
  (ok (map-get? observatory-data { observatory-id: id }))
)

(define-read-only (get-data (data-id uint))
  (ok (map-get? collected-data { data-id: data-id }))
)

(define-read-only (get-data-count)
  (ok (var-get data-count))
)

