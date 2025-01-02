;; Infrastructure Integration Contract

(define-map infrastructure
  { infrastructure-id: (string-ascii 50) }
  {
    name: (string-utf8 100),
    type: (string-ascii 50),
    location: (string-utf8 100),
    vulnerability-threshold: uint
  }
)

(define-map mitigation-actions
  { action-id: uint }
  {
    infrastructure-id: (string-ascii 50),
    alert-id: uint,
    action-type: (string-ascii 50),
    timestamp: uint,
    status: (string-ascii 20)
  }
)

(define-data-var action-count uint u0)

(define-public (register-infrastructure (id (string-ascii 50)) (name (string-utf8 100)) (type (string-ascii 50)) (location (string-utf8 100)) (vulnerability-threshold uint))
  (ok (map-set infrastructure
    { infrastructure-id: id }
    {
      name: name,
      type: type,
      location: location,
      vulnerability-threshold: vulnerability-threshold
    }
  ))
)

(define-public (trigger-mitigation-action (infrastructure-id (string-ascii 50)) (alert-id uint) (action-type (string-ascii 50)))
  (let
    (
      (new-action-id (+ (var-get action-count) u1))
    )
    (asserts! (is-some (map-get? infrastructure { infrastructure-id: infrastructure-id })) (err u404))
    (map-set mitigation-actions
      { action-id: new-action-id }
      {
        infrastructure-id: infrastructure-id,
        alert-id: alert-id,
        action-type: action-type,
        timestamp: block-height,
        status: "initiated"
      }
    )
    (var-set action-count new-action-id)
    (ok new-action-id)
  )
)

(define-public (update-action-status (action-id uint) (new-status (string-ascii 20)))
  (let
    (
      (action (unwrap! (map-get? mitigation-actions { action-id: action-id }) (err u404)))
    )
    (ok (map-set mitigation-actions
      { action-id: action-id }
      (merge action { status: new-status })
    ))
  )
)

(define-read-only (get-infrastructure (id (string-ascii 50)))
  (ok (map-get? infrastructure { infrastructure-id: id }))
)

(define-read-only (get-mitigation-action (action-id uint))
  (ok (map-get? mitigation-actions { action-id: action-id }))
)

(define-read-only (get-action-count)
  (ok (var-get action-count))
)

